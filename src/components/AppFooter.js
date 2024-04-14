import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a
          href="https://www.facebook.com/profile.php?id=100042468253696"
          target="_blank"
          rel="noopener noreferrer"
        >
          ADMIN
        </a>
      </div>
      <div className="ms-auto">
        <span className="me-1">CUNG CẤP BỞI</span>
        <a
          href="https://www.facebook.com/profile.php?id=100042468253696"
          target="_blank"
          rel="noopener noreferrer"
        >
          &amp; ADMIN
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
