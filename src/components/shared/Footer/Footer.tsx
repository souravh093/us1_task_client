export default function Footer() {
  return (
    <footer className="bg-secondary py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-medium mb-8">
          Stay Connected with <span className="block mt-2">SkillSync</span>
        </h2>

        <div className="space-y-3 text-gray-600">
          <p className="text-lg">8200, Barishal, Bangladesh</p>
          <p className="text-lg">
            <a
              href="tel:(+880) 1307628955"
              className="hover:text-gray-900 transition-colors"
            >
              (+880) 1307628955
            </a>
          </p>
          <p className="text-lg">
            <a
              href="mailto:souravehalder925@gmail.com"
              className="hover:text-gray-900 transition-colors"
            >
              souravehalder925@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
