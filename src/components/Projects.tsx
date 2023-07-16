import React, { useEffect, useState } from 'react'
import { ProjectDetailsModal } from "./ProjectDetailsModal";

interface Props {
  resumeProjects
  resumeBasicInfo
}

export const Projects: React.FC<Props> = ({resumeProjects, resumeBasicInfo}) => {
  const [state, setState] = useState<any>({
    deps: {},
    detailsModalShow: false,
  })

  const detailsModalShow = (data) => {
    setState({ detailsModalShow: true, deps: data });
  };

  const detailsModalClose = () => setState((prevState, _) => ({...prevState, detailsModalShow: false }));
  const [sectionName, setSectionName] = useState('')
  const [projects, setProjects] = useState<React.ReactElement[]>([])

  useEffect(() => {
    if (resumeProjects && resumeBasicInfo) {
      setSectionName(resumeBasicInfo.section_name.projects)
      setProjects(resumeProjects.map((project) => {
        return (
          <div
            className="col-sm-12 col-md-6 col-lg-4"
            key={project.title}
            style={{ cursor: "pointer" }}
          >
            <span className="portfolio-item d-block">
              <div className="foto" onClick={() => detailsModalShow(project)}>
                <div>
                  <img
                    src={project.images[0]}
                    alt="projectImages"
                    height="230"
                    style={{marginBottom: 0, paddingBottom: 0, position: 'relative'}}
                  />
                  <span className="project-date">{project.startDate}</span>
                  <br />
                  <p className="project-title-settings mt-3">
                    {project.title}
                  </p>
                </div>
              </div>
            </span>
          </div>
        )
      }))
    }
  }, [resumeProjects, resumeBasicInfo])

  return (
    <section id="portfolio">
      <div className="col-md-12">
        <h1 className="section-title" style={{ color: "black" }}>
          <span>{sectionName}</span>
        </h1>
        <div className="col-md-12 mx-auto">
          <div className="row mx-auto">
            {projects}
          </div>
        </div>
        <ProjectDetailsModal
          show={state.detailsModalShow}
          onHide={detailsModalClose}
          data={state.deps}
        />
      </div>
    </section>
  )
}
