import {
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CForm,
  CRow,
  CButton,
  CLabel,
  CInput,
  CCard,
  CFormGroup,
  CInvalidFeedback,
  CValidFeedback,
  CToaster,
  CToast,
  CToastHeader,
  CToastBody
} from '@coreui/react';

import CIcon from '@coreui/icons-react'
import React, { useState, useEffect, useRef, forwardRef } from 'react'
import AxiosClient from 'src/api/AxiosClient';
import Utility from 'src/api/Utility';
import { useHistory } from 'react-router-dom'

const DocumentUpload = () => {
  const history = useHistory();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [validateMessage, setValidateMessage] = useState(null);
  const [valid, setValid] = useState(null);
  const [success, setSuccess] = useState(null);

  const goBack = () => {
    history.push("/admin/tool/documents");
  }

  const validate = (event) => {
    if (event.target.value !== "") {
      if (event.target.files[0].size / (1024 * 1024) > 1) {
        setValidateMessage("File exceeds 10Mb !");
        setValid(false);
      } else {
        setValid(true);
      }
    } else {
      setValid(null);
    }
  }

  const UploadFile = async (event) => { 
    setSuccess(null);   
    event.preventDefault();
    if (valid) {
      setUploading(true);
      const file = event.target.file.files[0];
      const formData = new FormData();
      formData.append("file", file);
      await AxiosClient.post("/UploadFile", formData,
        {
          headers: { 'content-type': 'application/json', 'accept': '*/*' }
        }).then(res => {          
          // console.log(res);
          setUploading(false);
          setMessage("Upload file to server successfully!");
          setSuccess(true);          
          event.target.reset();
          return false;
        }).catch(err => {          
          // console.log(err);
          setUploading(false);
          setMessage("Could not upload the file to server!");
          setSuccess(false);
          event.target.reset();
          return false;
        });
    }
    
  }

  return (
    <CRow>
      <CCol xs="6">
        <CForm onSubmit={UploadFile}>
          <CCard>
            <CCardHeader>
              <h3>Upload New Document</h3>
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="file">Attach file here</CLabel>
                <CInput id="file" valid={valid == true} invalid={valid == false} onChange={validate} type="file" required placeholder="File" />
                <CInvalidFeedback className="help-block">
                  {validateMessage}
                </CInvalidFeedback>
                <CValidFeedback className="help-block">File is valid to upload</CValidFeedback>
              </CFormGroup>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" disabled={uploading} size="sm" color="primary"><CIcon name="cil-scrubber" />Upload</CButton>
              <CButton className="ml-2" type="reset" size="sm" color="danger"><CIcon name="cil-ban" />Reset</CButton>
              <CButton className="ml-2" onClick={goBack} size="sm" color="warning"><CIcon name="cil-arrow-thick-left" />Back</CButton>
            </CCardFooter>
          </CCard>
        </CForm>
        <CToaster position="bottom-right">
          <CToast color={success ? "success" : "danger"} autohide={1000} fade={true} show={success != null}>
            <CToastHeader >
              {success ? "Upload Success" : "Upload Fail"}
            </CToastHeader>
            <CToastBody>
              {message}
            </CToastBody>
          </CToast>
        </CToaster>
      </CCol>
    </CRow>
  )
}

export default DocumentUpload;
