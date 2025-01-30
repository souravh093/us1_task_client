import React from 'react'
import Banner from './_components/Banner'
import Unlock from './_components/Unlock'
import UniqueSkill from './_components/UniqueSkill'
import FAQSection from './_components/FAQSection'
import SkillCategories from './_components/SkillCategories'

const Home = () => {
  return (
    <div>
        <Banner />
        <SkillCategories />
        <Unlock />
        <UniqueSkill />
        <FAQSection />
    </div>
  )
}

export default Home