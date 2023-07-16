import React, { useEffect, useState } from 'react'
import './App.scss'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'

const primaryLanguage = 'en'

function App(): React.ReactElement {
  const [state, setState] = useState<any>({
    sharedData: {},
    resumeData: {}
  })

  const applyPickedLanguage = (pickedLanguage: string) => {
    document.documentElement.lang = pickedLanguage;
    loadResumeFromPath('res_primaryLanguage.json');
  }

  const loadResumeFromPath = (path: string) =>  {
    void fetch(path)
      .catch(error => console.log(error))
      .then((response: void | Response) => {
        if (!response) {
          return
        }
        return response.json()
      })
      .then(data => setState((prevState, _) => ({ ...prevState, resumeData: data })))
  }

  const loadSharedData = () => {
    void fetch('portfolio_shared_data.json')
      .catch((error) => console.log(error))
      .then((response: void | Response) => {
        if (!response) {
          return
        }
        return response.json()
      })
      .then((data) => {
        setState((prevState, _) => ({ ...prevState, sharedData: data }))
        document.title = `${data.basic_info.name} - Portfolio Frontend`;
      })
  }

  useEffect(() => {
    loadSharedData()
    applyPickedLanguage(primaryLanguage);
  }, [])

  return (
    <div>
      <Header sharedData={state.sharedData.basic_info} />
      <About
        resumeBasicInfo={state.resumeData.basic_info}
        sharedBasicInfo={state.sharedData.basic_info}
      />
      <Projects
        resumeProjects={state.resumeData.projects}
        resumeBasicInfo={state.resumeData.basic_info}
      />
      <Skills
        sharedSkills={state.sharedData.skills}
        resumeBasicInfo={state.resumeData.basic_info}
      />
      <Experience
        resumeExperience={state.resumeData.experience}
        resumeBasicInfo={state.resumeData.basic_info}
      />
      <Footer sharedBasicInfo={state.sharedData.basic_info} />
    </div>
  )
}

export default App
