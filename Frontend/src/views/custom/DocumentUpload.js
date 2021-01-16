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
  CValidFeedback
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
  const [file, setFile] = useState(null);

  const goBack = () => {
    history.push("/dashboard");
  }

  const validate = (event) => {
    if (event.target.value !== "") {
      if (event.target.files[0].size / (1024 * 1024) > 1) {
        setValidateMessage("File exceeds 10Mb !");
        setValid(false);
      }else {
        setValid(true);
      }
    }else{
      setValid(null);
    }


  }

  const UploadFile = async (event) => {
    if(valid){
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
          setMessage("Upload file success!");
        }).catch(err => {
          console.log(err);
          setUploading(false);
          setMessage("Could not upload the file!");
        });
    }
    event.preventDefault();
    return false;
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
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" />Upload</CButton>
              <CButton className="ml-2" type="reset" size="sm" color="danger"><CIcon name="cil-ban" />Reset</CButton>
              <CButton className="ml-2" onClick={goBack} size="sm" color="warning">Back</CButton>
            </CCardFooter>
          </CCard>
        </CForm>
      </CCol>
    </CRow>
  )
}

export default DocumentUpload;
