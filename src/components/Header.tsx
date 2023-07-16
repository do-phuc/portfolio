import React, { useEffect, useState } from 'react'
import Typical from "react-typical";
import Switch from "react-switch";

interface Props {
  sharedData
}

export const Header: React.FC<Props> = ({sharedData}) => {
  const [titles, setTitles] = useState<string[]>([]);
  const [state, setState] = useState({checked: false})


  const onThemeSwitchChange = (checked) => {
    setState({ checked });
    setTheme();
  }

  const setTheme = () => {
    const dataThemeAttribute = "data-theme";
    const body = document.body;
    const newTheme =
      body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
  }

  useEffect(() => {
    if (sharedData) {
      setTitles(sharedData.titles.map(x => [ x.toUpperCase(), 1500 ] ).flat());
    }
  }, [sharedData])

  const HeaderTitleTypeAnimation = React.memo( () => {
    return <Typical className="title-styles" steps={titles} loop={50} />
  }, () => true);

  return (
    <header id="home" style={{ height: window.innerHeight - 140, display: 'block' }}>
      <div className="row aligner" style={{height: '100%'}}>
        <div className="col-md-12">
          <div>
            <span className="iconify header-icon" data-icon="la:laptop-code" data-inline="false"></span>
            <br/>
            <h1 className="mb-0">
              <Typical steps={[name]} wrapper="p" />
            </h1>
            <div className="title-container mb-5">
              <HeaderTitleTypeAnimation />
            </div>
            <Switch
              checked={state.checked}
              onChange={onThemeSwitchChange}
              offColor="#baaa80"
              onColor="#353535"
              className="react-switch mx-auto"
              width={90}
              height={40}
              uncheckedIcon={
                <span
                  className="iconify"
                  data-icon="twemoji:owl"
                  data-inline="false"
                  style={{
                    display: "block",
                    height: "100%",
                    fontSize: 25,
                    textAlign: "end",
                    marginLeft: "20px",
                    color: "#353239",
                  }}
                ></span>
              }
              checkedIcon={
                <span
                  className="iconify"
                  data-icon="noto-v1:sun-with-face"
                  data-inline="false"
                  style={{
                    display: "block",
                    height: "100%",
                    fontSize: 25,
                    textAlign: "end",
                    marginLeft: "10px",
                    color: "#353239",
                  }}
                ></span>
              }
              id="icon-switch"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
