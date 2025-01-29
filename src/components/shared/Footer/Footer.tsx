export default function Footer() {
    return (
      <footer className="bg-secondary py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-8">
            Stay Connected with <span className="block mt-2">SkillShare Hub!</span>
          </h2>
  
          <div className="space-y-3 text-gray-600">
            <p className="text-lg">123 Learning Lane, Knowledge City, USA</p>
            <p className="text-lg">
              <a href="tel:(555) 123-4567" className="hover:text-gray-900 transition-colors">
                (555) 123-4567
              </a>
            </p>
            <p className="text-lg">
              <a href="mailto:support@skillsharehub.com" className="hover:text-gray-900 transition-colors">
                support@skillsharehub.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    )
  }
  
  