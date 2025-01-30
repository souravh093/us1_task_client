import {
    Code,
    Palette,
    Megaphone,
    Briefcase,
    Music,
    Camera,
    Video,
    PenTool,
    Utensils,
    Languages,
    Dumbbell,
    MoreHorizontal,
  } from "lucide-react"
  
  const categories = [
    { name: "PROGRAMMING", icon: Code },
    { name: "DESIGN", icon: Palette },
    { name: "MARKETING", icon: Megaphone },
    { name: "BUSINESS", icon: Briefcase },
    { name: "MUSIC", icon: Music },
    { name: "PHOTOGRAPHY", icon: Camera },
    { name: "VIDEOGRAPHY", icon: Video },
    { name: "WRITING", icon: PenTool },
    { name: "COOKING", icon: Utensils },
    { name: "LANGUAGE", icon: Languages },
    { name: "FITNESS", icon: Dumbbell },
    { name: "OTHER", icon: MoreHorizontal },
  ]
  
  export default function SkillCategories() {
    return (
      <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Skill Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
              >
                <category.icon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-sm font-semibold text-center text-gray-700 dark:text-gray-300">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  