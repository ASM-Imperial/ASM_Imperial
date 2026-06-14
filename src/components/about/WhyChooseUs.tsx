import { FC } from 'react';

type Feature = {
    description: string;
    image: string;
};

const features: Feature[] = [
    {
        description:
            'Our rugs are crafted in our own in-house production under strict supervision, with over 150 skilled weavers ensuring the highest quality and craftsmanship in every piece.',
        image: '/assets/images/WhyChooseUs/4.png',
    },
    {
        description:
            'Our expert team guides you in choosing the perfect rug, offering advice on materials, installation, and care, with top-notch service guaranteed.',
        image: '/assets/images/WhyChooseUs/3.png',
    },
    {
        description:
            'Our expert craftsmanship team produces premium hand-knotted rugs from Nepal, combining traditional weaving skills with strict quality control to ensure durability, precision, and timeless design.',
        image: '/assets/images/WhyChooseUs/1.png',
    },
    {
        description:
            'Timeless rugs crafted with precision, premium materials, and uncompromising quality standards.',
        image: '/assets/images/WhyChooseUs/2.png',
    },
];

const WhyChooseUs: FC = () => {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-32">
                    Why Choose Us?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map(({ description, image }, idx) => (
                        <div
                            key={idx}
                            className="relative flex flex-col items-center text-center
                                       p-6 pt-20 border rounded-lg shadow-sm
                                       hover:shadow-md transition"
                        >
                            {/* Floating image */}
                            <div
                                className="absolute -top-12 left-1/2 -translate-x-1/2
                                           bg-white rounded-full p-4
                                           border border-gray-200"
                            >
                                <img
                                    src={image}
                                    alt=""
                                    className="h-20 w-20 object-cover"
                                />
                            </div>

                            <p className="text-sm text-gray-600">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
