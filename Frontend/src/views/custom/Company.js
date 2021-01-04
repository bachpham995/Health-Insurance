import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'

const Company = ({ mode }) => {
  const [demoImg, setDemoImg] = useState(null);

  const onHandleChangeImage = (event) => {
    setDemoImg(event.target.value);
  }

  const Layout = () => {
    switch (mode) {
      case "create":
        return (
          <>
            <CRow>
              <CCol xs="12" sm="6">
                <CCard>
                  <CCardHeader>
                    <h3>{mode.toUpperCase() + " COMPANY"}</h3>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol xs="12">
                        <CFormGroup>
                          <CLabel htmlFor="name">Company Name</CLabel>
                          <CInput id="name" placeholder="Enter your name" required />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12">
                        <CFormGroup>
                          <CLabel htmlFor="phone">Phone</CLabel>
                          <CInput id="phone" type="tel" placeholder="Phone Number" required />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12">
                        <CFormGroup>
                          <CLabel htmlFor="website">Website</CLabel>
                          <CInput id="website" type="url" placeholder="website Url" required />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12">
                        <CFormGroup>
                          <CLabel htmlFor="street">Street</CLabel>
                          <CInput id="street" type="url" placeholder="Street" required />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel htmlFor="district">District</CLabel>
                          <CInput id="district" type="text" placeholder="District" required />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel htmlFor="city">City</CLabel>
                          <CInput id="city" type="text" placeholder="City" required />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel htmlFor="postal">Postal Code</CLabel>
                          <CInput id="postal" type="url" placeholder="Postal" required />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel htmlFor="country">Country</CLabel>
                          <CInput id="country" type="url" placeholder="Country" required />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  </CCardBody>
                  <CCardFooter>
                    <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
              <CCol xs="12" sm="6">
                <CCard>
                  <CCardHeader>
                    <CLabel htmlFor="image">Image</CLabel>
                    <CInput id="image" type="file" onChange={onHandleChangeImage} placeholder="Company Image" required />
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol xs="12">
                        <CImg id="demo_image" src={demoImg} width="80%"></CImg>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </>
        )

      default:
        break;
    }
  }

  return Layout();
}

export default Company;
