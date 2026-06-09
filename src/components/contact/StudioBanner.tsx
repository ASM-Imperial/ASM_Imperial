import React, { useEffect, useRef, useState } from "react";
import Container from "../ui/Container.tsx";
import { Phone, Mail } from "lucide-react";
import emailjs from "emailjs-com";

interface FormDataState {
  subject: string;
  name: string;
  address: string;
  company: string;
  country: string;
  email: string;
  contact: string;
  message: string;
}

interface FormErrors {
  subject?: string;
  name?: string;
  email?: string;
  contact?: string;
  address?: string;
  message?: string;
  country?: string;
  file?: string;
}

function formatBytes(bytes: number) {
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

async function fileToImageBitmap(file: File): Promise<ImageBitmap> {
  // createImageBitmap is widely supported in modern browsers
  return await createImageBitmap(file);
}

async function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
): Promise<Blob> {
  return await new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Failed to create blob"));
        else resolve(blob);
      },
      type,
      quality
    );
  });
}

/**
 * Compress any JPG/PNG to JPEG and try to get it under maxBytes.
 * Strategy:
 * - scale down to max dimension
 * - then reduce JPEG quality in steps
 * - if still too big, scale down further and retry
 */
async function compressImageToUnderBytes(
  file: File,
  maxBytes: number
): Promise<File> {
  const bitmap = await fileToImageBitmap(file);

  // Start with a reasonable max dimension for contact forms
  let maxDim = 1400;

  // We will iteratively scale down if needed
  for (let scaleAttempt = 0; scaleAttempt < 6; scaleAttempt++) {
    const ratio = Math.min(maxDim / bitmap.width, maxDim / bitmap.height, 1);
    const targetW = Math.max(1, Math.round(bitmap.width * ratio));
    const targetH = Math.max(1, Math.round(bitmap.height * ratio));

    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available");

    ctx.drawImage(bitmap, 0, 0, targetW, targetH);

    // Try decreasing quality
    const qualities = [0.82, 0.72, 0.62, 0.52, 0.42, 0.32];

    for (const q of qualities) {
      const blob = await canvasToBlob(canvas, "image/jpeg", q);

      if (blob.size <= maxBytes) {
        const newName =
          file.name.replace(/\.(png|jpg|jpeg)$/i, "") + "_compressed.jpg";
        return new File([blob], newName, { type: "image/jpeg" });
      }
    }

    // Still too large → shrink dimensions further and retry
    maxDim = Math.floor(maxDim * 0.75);
  }

  throw new Error("Unable to compress image under the size limit.");
}

export default function StudioBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [formData, setFormData] = useState<FormDataState>({
    subject: "",
    name: "",
    address: "",
    company: "",
    country: "",
    email: "",
    contact: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  /**
   * EmailJS limits vary by plan/account.
   * If you still see 413 with 80KB, reduce further (e.g. 50KB).
   */
  const MAX_FILE_BYTES = 80 * 1024; // 80KB

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2, rootMargin: "50px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearFileInput = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const setFileInputProgrammatically = (file: File) => {
    // Replace the file inside <input type="file"> so sendForm() sends THIS file.
    const dt = new DataTransfer();
    dt.items.add(file);
    if (fileInputRef.current) {
      fileInputRef.current.files = dt.files;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, file: undefined }));

    const original = e.target.files?.[0] || null;
    if (!original) {
      clearFileInput();
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(original.type)) {
      clearFileInput();
      setErrors((prev) => ({
        ...prev,
        file: "Please select a valid file (JPG or PNG only).",
      }));
      return;
    }

    try {
      // If already small enough, use as-is
      if (original.size <= MAX_FILE_BYTES) {
        setSelectedFile(original);
        return;
      }

      // Otherwise compress to fit under limit
      const compressed = await compressImageToUnderBytes(original, MAX_FILE_BYTES);

      setSelectedFile(compressed);
      setFileInputProgrammatically(compressed);
    } catch (err: any) {
      clearFileInput();
      setErrors((prev) => ({
        ...prev,
        file:
          err?.message ||
          `Unable to compress the file under ${formatBytes(MAX_FILE_BYTES)}.`,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim()))
      newErrors.name = "Name can contain only alphabets";

    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!formData.email.includes("@"))
      newErrors.email = "Email must include '@'";

    if (!formData.contact.trim()) newErrors.contact = "Contact is required";
    else if (!/^\d+$/.test(formData.contact.trim()))
      newErrors.contact = "Contact must contain only numbers";

    // Guard: if selectedFile exists, ensure it meets size limit
    if (selectedFile && selectedFile.size > MAX_FILE_BYTES) {
      newErrors.file = `File must be under ${formatBytes(MAX_FILE_BYTES)}.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(false);

    if (!validate()) return;

    if (!formRef.current) {
      alert("Form not ready. Please refresh and try again.");
      return;
    }

    setSending(true);

    try {
      // Verify actual size going out
      if (selectedFile) {
        console.log("Submitting attachment size:", selectedFile.size, "bytes");
      } else {
        console.log("Submitting with no attachment");
      }

      await emailjs.sendForm(
        "service_t313slu", // Service ID
        "template_l2cywnd", // Template ID
        formRef.current,
        "WUgx70zG43S3EF8fw" // Public Key
      );

      setSent(true);
      setFormData({
        subject: "",
        name: "",
        address: "",
        company: "",
        country: "",
        email: "",
        contact: "",
        message: "",
      });

      clearFileInput();
      formRef.current.reset();
    } catch (err: any) {
      alert(
        "Email send failed. If the Network tab still shows 413 (Content Too Large), your EmailJS account likely has a very small upload limit for send-form attachments. In that case, you must either reduce MAX_FILE_BYTES further (try 50KB) or switch to upload+link (recommended)."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-sage-green/10 to-mint-green/10 px-4 sm:px-6"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 lg:items-stretch">
          {/* Left Column: Contact Form */}
          <div
            className={`bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 transition-all duration-800 h-full ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-charcoal mb-4 sm:mb-5 text-center pt-6 sm:pt-0">
              Contact Us
            </h2>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-3 sm:space-y-4 max-w-lg mx-auto"
            >
              <div>
                <label htmlFor="subject" className="block mb-1 text-xs sm:text-sm text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full p-2 sm:p-2.5 text-sm sm:text-base border rounded ${errors.subject ? "border-red-500" : "border-gray-300"
                    }`}
                  required
                />
                {errors.subject && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="name" className="block mb-1 text-xs sm:text-sm text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-2 sm:p-2.5 text-sm sm:text-base border rounded ${errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  required
                />
                {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="address" className="block mb-1 text-xs sm:text-sm text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-2 sm:p-2.5 text-sm sm:text-base border rounded ${errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  required
                />
                {errors.address && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <label htmlFor="company" className="block mb-1 text-xs sm:text-sm text-gray-700">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-2.5 text-sm sm:text-base border border-gray-300 rounded"
                />
              </div>

              <div>
                <label htmlFor="country" className="block mb-1 text-xs sm:text-sm text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full p-2 sm:p-2.5 text-sm sm:text-base border rounded ${errors.country ? "border-red-500" : "border-gray-300"
                    }`}
                  required
                />
                {errors.country && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.country}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block mb-1 text-xs sm:text-sm text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 sm:p-2.5 text-sm sm:text-base border rounded ${errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  required
                />
                {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="contact" className="block mb-1 text-xs sm:text-sm text-gray-700">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className={`w-full p-2 sm:p-2.5 text-sm sm:text-base border rounded ${errors.contact ? "border-red-500" : "border-gray-300"
                    }`}
                  required
                />
                {errors.contact && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.contact}</p>}
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Choose a File (Optional - JPG/PNG only)
                </label>

                {/* IMPORTANT:
                    In EmailJS template → Attachments tab → Form File Attachment → Parameter name MUST be "my_file"
                    because the input name is "my_file".
                */}
                <input
                  ref={fileInputRef}
                  type="file"
                  name="my_file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />

                {errors.file && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.file}</p>}

                {selectedFile && !errors.file && (
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    Selected: {selectedFile.name} ({formatBytes(selectedFile.size)})
                  </p>
                )}

                <p className="text-gray-500 text-xs mt-1">
                  Max attachment size: {formatBytes(MAX_FILE_BYTES)} (auto-compressed)
                </p>
              </div>

              <div>
                <label htmlFor="message" className="block mb-1 text-xs sm:text-sm text-gray-700">
                  Your Message / Special Instruction
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full p-2 sm:p-2.5 text-sm sm:text-base border rounded ${errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                  required
                />
                {errors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-mint-green text-charcoal px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-mint-green/90 transition"
              >
                {sending ? "Sending..." : "Submit"}
              </button>

              {sent && (
                <p className="text-green-600 text-xs sm:text-sm mt-1">
                  Message sent successfully!
                </p>
              )}
            </form>
          </div>

          {/* Right Column: Visit Us Card (unchanged) */}
          <div
            className={`bg-off-white rounded-lg p-4 sm:p-6 md:p-8 lg:p-12 shadow-lg transition-all duration-800 ${isVisible ? "opacity-100 translate-x-0 shadow-xl" : "opacity-0 translate-x-8 shadow-lg"
              }`}
            style={{
              transitionDelay: isVisible ? "300ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <div className="mb-4 sm:mb-6">
              <span
                className={`inline-block text-xs sm:text-sm font-medium uppercase tracking-wide mb-2 transition-all duration-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
              >
                Experience Hand-Knotted Mastery
              </span>
              <h2
                className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-charcoal mb-4 sm:mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
              >
                Visit Us
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <p
                className={`text-sm sm:text-base text-charcoal/70 leading-relaxed transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
              >
                Explore our showroom in Lalitpur, Nepal - meet our artisans, see traditional weaving in action,
                and find the perfect rug for your space.
              </p>

              <div className="space-y-3 sm:space-y-4">
                <div
                  className={`transition-all duration-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    }`}
                >
                  <h4 className="font-medium text-sm sm:text-base text-charcoal mb-1 sm:mb-2">Showroom Hours</h4>
                  <p className="text-xs sm:text-sm text-charcoal/70">
                    Sunday - Friday: 8:00 AM - 5:00 PM
                    <br />
                    Saturday: 8:00 AM - 12:00 PM
                  </p>
                </div>

                <div
                  className={`transition-all duration-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    }`}
                >
                  <h4 className="font-medium text-sm sm:text-base text-charcoal mb-1 sm:mb-2">Location</h4>
                  <p className="text-xs sm:text-sm text-charcoal/70">
                    Thaiba-14, Lalitpur
                    <br />
                    Nepal
                  </p>
                </div>

                <div
                  className={`transition-all duration-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    }`}
                >
                  <h4 className="font-medium text-sm sm:text-base text-charcoal mb-1 sm:mb-2">Contact</h4>
                  <div className="text-xs sm:text-sm text-charcoal/70 space-y-2">
                    <p className="flex items-center space-x-2">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>+977-9801037585</span>
                    </p>

                    <p className="flex items-start space-x-2">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                      <span className="break-all">info@modernnaturedesignnepal.com</span>
                    </p>

                    <p className="flex items-start space-x-2">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                      <span className="break-all">modernnaturedesignnepal@gmail.com</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/Modern+Nature+Design+Nepal/@27.6277525,85.3437677,133m/data=!3m1!1e3!4m6!3m5!1s0x39eb173a709414c3:0x982c4a313e31facb!8m2!3d27.6277484!4d85.3441998!16s%2Fg%2F11d_tqv0p9?entry=ttu&g_ep=EgoyMDI1MTIwMS4wIKXMDSoASAFQAw%3D%3D",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className={`bg-mint-green text-charcoal px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg text-sm sm:text-base font-medium hover:bg-mint-green/90 transition-all duration-600 w-full sm:w-auto ${isVisible ? "opacity-100 translate-y-0 shadow-md hover:shadow-lg" : "opacity-0 translate-y-4 shadow-sm"
                }`}
              style={{
                transitionDelay: isVisible ? "500ms" : "0ms",
                transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              Find a showroom
            </button>

            <div className="mt-12 w-full h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-md">
              <iframe
                title="Modern Nature Design Nepal Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.197370308496!2d85.3437677!3d27.6277484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb173a709414c3%3A0x982c4a313e31facb!2sModern%20Nature%20Design%20Nepal!5e0!3m2!1sen!2snp!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
