import getBrowserWindow from "./getBrowserWindow";
import {parseCohortIds} from "../../pages/patientView/clinicalInformation/PatientViewPageStore";

export const NAVCASEIDS_PARAM = "navCaseIds";

export const NAVCASEIDS_REGEXP = new RegExp(`${NAVCASEIDS_PARAM}=([^&]*)`);

const PROP_NAME = "navCaseIdsCache";

export function handleLongUrls(){
    const navCaseIdMatch = getBrowserWindow().location.hash.match(new RegExp(NAVCASEIDS_REGEXP));
    // google analytics starts to crash when location.href gets too long
    // this is a fairly arbitrary length at which point we need to store these caseIds in localStorage instead of in hash
    if (navCaseIdMatch && navCaseIdMatch[1].length > 60000) {
        // now delete from url so that we don't hurt google analytics
        getBrowserWindow().location.hash = getBrowserWindow().location.hash.replace(NAVCASEIDS_REGEXP,"");
        getBrowserWindow()[PROP_NAME] = navCaseIdMatch[1];
    }
}

export function getNavCaseIdsCache(){
    const data = getBrowserWindow()[PROP_NAME];
    delete getBrowserWindow()[PROP_NAME];
    return (data) ? parseCohortIds(data) : undefined;
}