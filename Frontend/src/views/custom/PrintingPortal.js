import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import ReportSkeleton from '../Reports/ReportSkeleton';
import ReportEmployeeSkeleton from '../Reports/ReportEmployeeSkeleton';
// import { useHistory } from "react-router-dom";

const copyStyles = (sourceDoc, targetDoc) => {
    const styleSheets = Array.from(document.styleSheets).filter(
        (styleSheet) => !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
    );

    Array.from(styleSheets).forEach((styleSheet) => {
        if (styleSheet instanceof CSSStyleSheet && styleSheet.cssRules) {
            // true for inline styles
            const newStyleEl = sourceDoc.createElement('style');
            Array.from(styleSheet.cssRules).forEach((cssRule) => {
                newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
            });
            targetDoc.head.appendChild(newStyleEl);
        } else if (styleSheet.href) {
            // true for stylesheets loaded from a URL
            const newLinkEl = sourceDoc.createElement('link');
            newLinkEl.rel = 'stylesheet';
            newLinkEl.href = styleSheet.href;
            targetDoc.head.appendChild(newLinkEl);
        }
    });
};



const PrintingPortal = ({ employee, requestData, onPrintCancelled,tableQuery,img}) => {
    const [containerEl] = useState(document.createElement('div'));
    const [query,setQuery] = useState(null);
    useEffect(() => {
        if (employee) {
            console.log(tableQuery);
            setQuery(tableQuery);
            const printingPortalWindow = window.open(
                '',
                'PrintingPortalWindow',
                'width=900,height=600'
            );
            if (!printingPortalWindow) {
                alert("Please turn off the popup blocking befoce using this feature");
            }
            if (printingPortalWindow) {
                printingPortalWindow.document.body = document.createElement('body');
                printingPortalWindow.document.body.appendChild(containerEl);
                printingPortalWindow.document.title = 'PrintingPortalWindow';
                copyStyles(document, printingPortalWindow.document);

                setTimeout(() => {
                    printingPortalWindow.print();
                }, 500);
                printingPortalWindow.onfocus = () => {
                    setTimeout(() => {
                        printingPortalWindow.close();
                        onPrintCancelled();
                    }, 500);
                };
                return () => {
                    printingPortalWindow.close();
                    onPrintCancelled();
                };
            }
        }
    }, [employee, containerEl, onPrintCancelled]);

    return ReactDOM.createPortal(
        
        tableQuery != "Employee"?
        <ReportSkeleton data={employee} requestData={requestData} />:
        <ReportEmployeeSkeleton user={employee} policy={requestData} img={img}/>,
        containerEl
    );
};
export default PrintingPortal;
