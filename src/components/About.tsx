import { Trophy, Tv, Users, Zap } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Tv,
      title: "Free Access",
      description: "Stream all your favorite sports without any payment required.",
    },
    {
      icon: Zap,
      title: "HD Streams",
      description: "Watch in crystal-clear quality on any device.",
    },
    {
      icon: Users,
      title: "No Sign-Up",
      description: "Enjoy instant access without creating an account.",
    },
    {
      icon: Trophy,
      title: "Wide Coverage",
      description: "From football to F1, we've got all sports covered.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            About Streamin
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Streamin is the ultimate destination for live sports streaming, offering a fast,
            mobile-friendly platform for sports fans worldwide.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative p-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                  <div className="space-y-4">
                    <feature.icon className="h-8 w-8 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;