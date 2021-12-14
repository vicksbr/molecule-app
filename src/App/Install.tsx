import React from 'react'
import styled from 'styled-components'

export type InstructionsProps = React.HTMLProps<HTMLUListElement>

/**
 * How to install the progressive web app (PWA).
 */
export const Instructions = styled((props: InstructionsProps) => (
  <ul { ...props }>
    <li>
      Open <a href='https://app.molecule.dev' target='_blank' rel='noopener noreferrer'>app.molecule.dev</a> in any web browser on desktop or mobile which supports PWA installation. Popular browsers include Chrome, Brave, Edge, Samsung, and Mobile Safari.
    </li>

    <li>
      If your browser supports it, click the "Install" option that appears on the right side of your address bar when you load the page. For some mobile browsers (like iOS Safari), there may be an "Add to Homescreen" option to use instead.
    </li>

    <li>
      After installation, you can use Molecule just like any other app!
    </li>
  </ul>
))`
  margin: 0 auto 60px;
  width: 100%;
  max-width: 450px;
  text-align: left;

  > li {
    margin: 15px;
  }
`

export type DetailsProps = React.HTMLProps<HTMLDetailsElement>

/**
 * Toggles the PWA installation instructions.
 */
export const Details = styled(({ children, ...props }: DetailsProps) => (
  <details { ...props }>
    <summary>
      PWA installation instructions
    </summary>

    {children}
  </details>
))`
  margin: 15px 0;
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme, color }) => theme.colors[color as keyof typeof theme.colors] || `inherit`};

  > summary {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;

    @media (max-width: 500px) {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
`

export type InstallProps = React.HTMLProps<HTMLDivElement>

/**
 * Describes various app installation methods.
 * 
 * Platform badges with links are added as necessary for your specific Molecule.
 */
export const Install = styled((props: InstallProps) => (
  <div { ...props }>
    <h2>
      Quick Installation
    </h2>

    <p>
      <span>Molecule is a progressive web application, which means </span>
      <span>you can install it instantly and always get the latest updates, fast.</span>
    </p>

    <Details>
      <Instructions />
    </Details>
  </div>
))`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;

  > p {
    font-size: 18px;
    line-height: 24px;
  }

  > a {
    display: block;
    height: 50px;
    margin: 10px;

    > img {
      height: 100%;
    }
  }

  @media (min-width: 560px) {
    > p {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    > a {
      display: inline-block;
      vertical-align: top;
    }
  }
`
