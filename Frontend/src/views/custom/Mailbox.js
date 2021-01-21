import {
    CButton
    , CCol
    , CContainer
    , CInput
    , CRow
    , CNav
    , CNavItem
    , CNavLink
    , CButtonGroup
    , CDropdown
    , CDropdownToggle
    , CDropdownItem
    , CDropdownMenu
    , CForm
    , CInputGroup
    , CInputGroupAppend
    , CInputGroupText
    , CInputGroupPrepend,
    CDataTable,
    CCardHeader,
    CCard, CModal, CModalHeader, CModalBody, CModalFooter, CFormGroup, CTextarea
} from '@coreui/react'
import React, { useState } from 'react'
import CIcon from '@coreui/icons-react';

const Mailbox = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }

    const getEmails = () => {
        
    }
    return (
        <>
            <CContainer >
                <CRow>
                    <CCol md='3'>
                        <h1><CIcon size='xl' name='cil-envelope-letter'></CIcon>&ensp;Inbox</h1>
                        <CButton block={true} color='primary' onClick={toggle}>
                            <CIcon name='cil-pencil'></CIcon>&ensp;NEW MESSAGE
                        </CButton>
                        <hr />
                        <CNav variant="pills" vertical={true} >
                            <h5>Folder</h5>
                            <CNavItem>
                                <CNavLink><CIcon name='cil-envelope-letter'></CIcon>&ensp;Inbox (14)</CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink><CIcon name='cil-star'></CIcon>&ensp;Starred</CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink><CIcon name='cil-check'></CIcon>&ensp;Important</CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink><CIcon name='cil-paper-plane'></CIcon>&ensp;Sent</CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink><CIcon name='cil-trash'></CIcon>&ensp;Drafts</CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink><CIcon name='cil-folder'></CIcon>&ensp;Spam (217)</CNavLink>
                            </CNavItem>
                        </CNav>
                    </CCol>
                    <CCol md='9'>
                        <CRow>
                            <CCol sm='6'>
                                <CDropdown>
                                    <CDropdownToggle caret color="info">
                                        Action
                                    </CDropdownToggle>
                                    <CDropdownMenu>
                                        <CDropdownItem>Mark as read</CDropdownItem>
                                        <CDropdownItem>Mark as read</CDropdownItem>
                                        <CDropdownItem>Mark as important</CDropdownItem>
                                        <CDropdownItem divider />
                                        <CDropdownItem>Report spam</CDropdownItem>
                                        <CDropdownItem>Delete</CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>
                            </CCol>
                            <CCol md='6'>
                                <CForm>
                                    <CInputGroup>
                                        <CInput placeholder='Search' />
                                        <CInputGroupAppend>
                                            <CButton color='success' size='sm'><CIcon name='cil-magnifying-glass' /></CButton>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </CForm>
                            </CCol>
                        </CRow>
                        <CRow className='mt-2'>
                            <CCol>
                                <CCard>
                                    <CDataTable>

                                    </CDataTable>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CCol>
                    <CModal show={modal} onClose={toggle}>
                        <CModalHeader closeButton>
                            <h4><CIcon name='cil-envelope-closed' size='xl' className='mb-2'></CIcon> Compose New Message</h4>
                        </CModalHeader>
                        <CModalBody>
                            <CFormGroup>
                                <CInput placeholder="To" name="to" type="email" />
                            </CFormGroup>
                            <CFormGroup>
                                <CInput placeholder="cc" name="cc" type="email" />
                            </CFormGroup>
                            <CFormGroup>
                                <CInput placeholder="bcc" name="bcc" type="email" />
                            </CFormGroup>
                            <CFormGroup>
                                <CInput placeholder="Subject" name="subject" type="email" />
                            </CFormGroup>
                            <CFormGroup>
                                <CTextarea cols='20' rows='10'></CTextarea>
                            </CFormGroup>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="primary"><CIcon name='cil-envelope-closed' size='md' className='pb-1'></CIcon> Send Message</CButton>{' '}
                            <CButton
                                color='secondary'
                                onClick={toggle}
                            >Discard</CButton>
                        </CModalFooter>
                    </CModal>
                </CRow>
            </CContainer>
        </>
    )
}

export default Mailbox
