//////////////////////////////////////////////////////////

                 /* MUTATION OBSERVER */

//////////////////////////////////////////////////////////


function getAutoInscriereData() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['autoInscriereData'], (result) => {
      if(chrome.runtime.lastError){
        return reject(chrome.runtime.lastError);
      }
      if(result.autoInscriereData) {
        const parsedData = JSON.parse(result.autoInscriereData);
        return resolve(parsedData);
      }
      return resolve(null);
    });
  });
}

function getAdresaData() {
 return new Promise((resolve, reject) => {
    chrome.storage.local.get(['adresaData'], (result) => {
      if(chrome.runtime.lastError){
        return reject(chrome.runtime.lastError);
      }
      if(result.adresaData) {
        const parsedData = JSON.parse(result.adresaData);
        return resolve(parsedData);
      }
      return resolve(null);
    });
  });
}

function getZonaCoopData() {
  return new Promise((resolve, reject) => {
      chrome.storage.local.get(['zonaCoopData'], (result) => {
        if(chrome.runtime.lastError){
          return reject(chrome.runtime.lastError);
        }
        if(result.zonaCoopData) {
          const parsedData = JSON.parse(result.zonaCoopData);
          return resolve(parsedData);
        }
        return resolve(null);
      });
    });
}

function getZonaImprData() {
  return new Promise((resolve, reject) => {
      chrome.storage.local.get(['zonaImprData'], (result) => {
        if(chrome.runtime.lastError){
          return reject(chrome.runtime.lastError);
        }
        if(result.zonaImprData) {
          const parsedData = JSON.parse(result.zonaImprData);
          return resolve(parsedData);
        }
        return resolve(null);
      });
    });
}

function getWriteValuesData() {
  return new Promise((resolve, reject) => {
      chrome.storage.local.get(['writeValuesData'], (result) => {
        if(chrome.runtime.lastError){
          return reject(chrome.runtime.lastError);
        }
        if(result.writeValuesData) {
          const parsedData = JSON.parse(result.writeValuesData);
          return resolve(parsedData);
        }
        return resolve(null);
      });
    });
}

function getReplaceValuesData() {
  return new Promise((resolve, reject) => {
      chrome.storage.local.get(['replaceValuesData'], (result) => {
        if(chrome.runtime.lastError){
          return reject(chrome.runtime.lastError);
        }
        if(result.replaceValuesData) {
          const parsedData = JSON.parse(result.replaceValuesData);
          return resolve(parsedData);
        }
        return resolve(null);
      }
    );
  });
}


function getStorageItem(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['mainOptions'], (result) => {
      if(chrome.runtime.lastError){
        console.error('Runtime Error:', chrome.runtime.lastError);
        return reject(chrome.runtime.lastError);
      }
      if(result.mainOptions) {
        const parsedData = JSON.parse(result.mainOptions);
        const item = parsedData.find((a) => a.key === key);
        if (item) {
          return resolve(item.value);
        }
        return resolve(null);
      }
      return resolve(null);
    });
  });
}


const constructiiLogic = async () => {
  try {
    const writeCcValuesBrCheck = await getStorageItem('checkb2');
    if (writeCcValuesBrCheck) writeCcValuesBR();
  }
  catch (err) {
    console.error(err);
  }

  try {
    const writeCcValuesCtCheck = await getStorageItem('checkc2');
    if (writeCcValuesCtCheck) writeCcValuesCT();
  }
  catch (err) {
    console.error(err);
  }

  try {
    const writeEtajCheck = await getStorageItem('writeEtaj');
    if (writeEtajCheck) writeEtaj();
  }
  catch (err) {
    console.error(err);
  }

  try {
    const writeCcX3Check = await getStorageItem('writeCC3');
    if (writeCcX3Check) writeCcX3();
  }
  catch (err) {
    console.error(err);
  }
};

const inscrieriLogic = async () => {
  try {
    const deleteSectionOneCheck = await getStorageItem('deleteSectionOne');
    if (deleteSectionOneCheck) deleteSectionOne();
  }
  catch (err) {
    console.error(err);
  }

  try {
    const autoInscriereData = await getAutoInscriereData();
    if (autoInscriereData) {
      const validData = autoInscriereData.filter(data => data !== null && data.checker)
      validData.forEach(data => {
        autoInscriere({
          actVal: data.actVal,
          tipInr: data.tipInr,
          tipDr: data.tipDr,
          modDob: data.modDob,
          detaliiDr: data.detaliiDr,
          refTer: data.refTer,
          poz: data.poz,
          section: data.section,
          comentarii: data.coment,
          note: data.note
      });
      })
    }
  }
  catch (err) {
    console.error(err);
  }

  try {
    const quotaCheck = await getStorageItem('quota');
    if (quotaCheck) writeQuota();
  }
  catch (err) {
    console.error(err);
  }
}

const imobilLogic = async () => {

  try {
    const copyNcIeCheck = await getStorageItem('copyNcIe');
    if (copyNcIeCheck) copyNcIe();
  }
  catch (err) {
    console.error(err);
  }

  try {
    const zonaCoopData = await getZonaCoopData();
    if (zonaCoopData) {
      const validData = zonaCoopData.filter(data => data !== null && data.bifaCoopProj)
      validData.forEach(data => {
        selectZonaCoop(data.coopProj);
      }
    )}
  }
  catch (err) {
    console.error(err);
  }

  try {
    const zonaImprData = await getZonaImprData();
    if (zonaImprData) {
      const validData = zonaImprData.filter(data => data !== null && data.bifaImprProj)
      validData.forEach(data => {
        selectImpr(data.imprProj);
      }
    )}
  }
  catch (err) {
    console.error(err);
  }
}

const adresaLogic = async () => {

  try {
  const adresaData = await getAdresaData();

  if (adresaData) {
    const validData = adresaData.filter(data => data !== null && data.addy)
    validData.forEach(data => {
      writeSatAndPostalCode(data.name, data.satName, data.postcode, data.intra);  // Pass the data as argument
    }
  )}
  }
  catch (err) {
    console.error(err);
  }
}

const suprLogic = async () => {

  try {
    const fillInMeasuredParcelBRCheck = await getStorageItem('checkbr1');
    if (fillInMeasuredParcelBRCheck) fillInMeasuredParcelBR();
  }
  catch (err) {
    console.error(err);
  }

  try {
    const fillInMeasuredParcelCtCheck = await getStorageItem('checkct1');
    if (fillInMeasuredParcelCtCheck) fillInMeasuredParcelCT();
  }
  catch (err) {
    console.error(err);
  }
}

const actLogic = async () => {
  try {
    const addBNPToEmitentCheck = await getStorageItem('addBNPToEmitent');
    if (addBNPToEmitentCheck) addBNPToEmitent();
  }
  catch (err) {
    console.error(err);  
  }
};

const generalLogic = async () => {

  try {
    const writeValuesData = await getWriteValuesData();
    if (writeValuesData) {
      const validData = writeValuesData.filter(data => data !== null && data.write)
      validData.forEach(data => {
        writeValues(data.field, data.text);
      });
    }
  }
  catch (err) {
    console.error(err);
  }

  try {
    const replaceValuesData = await getReplaceValuesData();
    if (replaceValuesData) {
      const validData = replaceValuesData.filter(data => data !== null && data.replace)
      validData.forEach(data => {
        replaceValues(data.field, data.initialText, data.correctedText);
      });
    }
  }
  catch (err) {
    console.error(err);
  }
}

const intervals = {
  general: { pattern: '<', selector: 'body', isActive: false, fn: generalLogic, interval: null },
  address: { pattern: 'ng-model=\"d34.val\"', selector: '[ng-model="d34.val"]', isActive: false, fn: adresaLogic, interval: null },
  constr: { pattern: 'label=\"Anexa\"', selector: 'option[label="Anexa"]', isActive: false, fn: constructiiLogic, interval: null },
  act: { pattern: 'label=\"Act notarial\"', selector: 'option[label="Act notarial"]', isActive: false, fn: actLogic, interval: null },
  inscrieri: { pattern: 'label=\"Ipoteca\"', selector: 'option[label="Ipoteca"]', isActive: false, fn: inscrieriLogic, interval: null },
  selectRows: { pattern: 'type=\"checkbox\"', selector: 'td input[type="checkbox"]', isActive: false, fn: selectRow, interval: null },
  surfaceArea: { pattern: 'label=\"A - ARABIL\"', selector: '[ng-model="scopeRef.d44.val"] option[label="A - ARABIL"][value="string:2"]', isActive: false, fn: suprLogic, interval: null },
  imobil: { pattern: 'title=\"Editare adresa\"', selector: '[title="Editare adresa"]', isActive: false, fn: imobilLogic, interval: null },
};

const toggleInterval = (key, shouldActivate) => {
  if (!intervals[key]) {
    console.error(`No interval found for key: ${key}`);
    return;
  }

  if (shouldActivate && !intervals[key].isActive) {
    intervals[key].interval = setInterval(intervals[key].fn, 500);
    intervals[key].isActive = true;
  } else if (!shouldActivate && intervals[key].isActive) {
    clearInterval(intervals[key].interval);
    intervals[key].isActive = false;
  }
};


const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.target.nodeType === Node.ELEMENT_NODE) {
      const targetHTML = mutation.target.innerHTML;
      
      for (const [key, { pattern, selector, isActive, }] of Object.entries(intervals)) {
        const patternMatches = targetHTML.includes(pattern);
        const elementExists = document.querySelector(selector);
        
        if (patternMatches && !isActive && elementExists) {
          toggleInterval(key, true);
        } else if (!patternMatches && isActive && !elementExists) {
          toggleInterval(key, false);
        }
      }
    }
  });
});

observer.observe(document.body, { attributes: true, childList: true, subtree: true });



//////////////////////////////////////////////////////////

                 /* FUNCTII GENERALE */

//////////////////////////////////////////////////////////

const shortcutsCheck = getStorageItem('shortcuts');

if (shortcutsCheck) {
  shortcut(83, true, false, '.btn.btn-sm.btn-success.btn-hover-scale', 'focus');
  shortcut(86, true, false, '.btn.btn-sm.btn-info.btn-hover-scale[title="Verifica erori imobil"]');
  shortcut(188, false, true, '[ng-disabled="d39.ro"]');
  shortcut(190, false, true, '[ng-disabled="d41.ro"]');
  shortcut(68, true, false, '.btn.btn-sm.btn-info.btn-hover-scale[title="Preview fisier"]');
  shortcut(13, false, false, '[ng-click="confirmationScope.ok()"]', 'focus');
}

const findNcCheck = async() => { await getStorageItem('findNc') }

if (findNcCheck) {
shortcut(67, true, false, '[ng-model="scopeRef.d75.val"]', 'focus', true);
}


function writeEtaj() {
    let etaj = document.querySelector('[ng-model="d20.val"]');

	if (etaj.value === '' || etaj.value === '0') { 
            etaj.value = ''
            fillField(etaj, '1', false)
}
}

function deleteSectionOne() {
let option = document.querySelector(`select[ng-model="scopeRef.d32.val"] option[label="1"]`);
if (option) {
  option.remove();
}
}

function addBNPToEmitent() {
let act = document.querySelector('option[label="Act notarial"][selected="selected"]')
let valueAct = document.querySelector('[ng-model="d24.val"]');
const regex = /(BNP|NP|BIN|NOTAR|NOTARIAL|SPN|BN)/i;

if (act) {
if (!regex.test(valueAct.value.slice(0, 5).toUpperCase())) {
  let newValue = "BNP " + valueAct.value;
  fillField(valueAct, newValue, false);
}
}
}

async function copyNcIe() {
  let nc = document.querySelector('[ng-disabled="d59.ro"]');
  let ie = document.querySelector('[ng-disabled="d56.ro"]');
  
  if (ie && nc.value !== '' && ie.value === '') {
    // Match any number string until it meets a comma, a space, or reaches the end
    let match = nc.value.match(/[^, ]*/);
    let substring = match ? match[0] : '';

    await fillField(ie, substring, false);
    
    if (saveBtn) {
      ie.focus();
    }
  }
}

async function writeQuota() {
  // var tipnull = document.querySelector(`select[ng-model='scopeRef.d7.val'] option[value="object:null"]`)
  let proprietate = document.querySelector("option[label='Proprietate']")
  let uzu = document.querySelector("option[label='Uzufruct']")
  var quota = document.querySelector("option[label='Cota fractionara']");
  let dropdown = document.querySelector('[ng-model="scopeRef.d37.val"]');
  let initialQuota = document.querySelector('[ng-model="scopeRef.d40.val"]');
  let actualQuota = document.querySelector('[ng-model="scopeRef.d43.val"]');

  if (proprietate.selected || uzu.selected) { 
      if (document.querySelector("[ng-model='scopeRef.d37.val'][disabled='disabled']")) {
    initialQuota.removeAttribute('disabled')
    actualQuota.removeAttribute('disabled')
    dropdown.removeAttribute('disabled')
    }

    if (initialQuota.value.trim() === "" && actualQuota.value.trim() === "" ) {
        quota.selected = true;
        var event = new Event('change');
        dropdown.dispatchEvent(event);
        dropdown.focus();

        await fillField(initialQuota, "1/1", false);
        await fillField(actualQuota, "1/1", false);
    }

  }
  // else if ((!proprietate.selected || !uzu.selected) && !tipnull.selected) {
  //  disableQuota();
  // }
}

// async function disableQuota() {
//   var quota = document.querySelector(`select[ng-model='scopeRef.d37.val'] option[value="object:null"]`)
//   let notkewldrop = document.querySelector('[ng-model="scopeRef.d37.val"]');
//   let dropdown = document.querySelector('[ng-model="scopeRef.d37.val"]')
//   let initialQuota = document.querySelector('[ng-model="scopeRef.d40.val"]')
//   let actualQuota = document.querySelector('[ng-model="scopeRef.d43.val"]')
  
//   if (document.querySelector("[ng-model='scopeRef.d37.val'][disabled='disabled']") == null) {
//     await fillField(initialQuota, " ", false).then(() => {
//       fillField(actualQuota, " ", false)
//     });

//     selectOption(quota, notkewldrop)
    
//     setTimeout(() => {
//     dropdown.setAttribute('disabled', 'disabled')
//     initialQuota.setAttribute('disabled', 'disabled')
//     actualQuota.setAttribute('disabled', 'disabled')
//     }, 1000);
//   }
// }

function addRowClickListener(row) {
  const checkbox = row.querySelector('td input[type="checkbox"]');
  if (checkbox) {
    row.style.cursor = 'pointer';
  }

  row.addEventListener('click', function(e) {
    if (e.target.tagName !== 'BUTTON') {
      if (e.target.type !== 'checkbox') {
        const checkbox = this.querySelector('td input[type="checkbox"]');
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          const event = new Event('change');
          checkbox.dispatchEvent(event);
        }
      }
    }
  });
}

function selectRow() {
document.querySelectorAll('tr').forEach(row => {
  const checkbox = row.querySelector('td input[type="checkbox"]');
  if (checkbox) {
    addRowClickListener(row);
  }
});
}

function writeCcX3() {
  let measuredCC = document.querySelector('[ng-model="d10.val"]');
  let totalCC = document.querySelector('[ng-model="d13.val"]');
  let etaj = document.querySelector('[ng-model="d20.val"]');

  let etajTotal = measuredCC.value * etaj.value

  if (totalCC.value !== etajTotal.toString()) {
    fillField(totalCC, etajTotal.toString(), false)
  }
}


//////////////////////////////////////////////////////////

                    /* PROIECTE */

//////////////////////////////////////////////////////////

function writeSatAndPostalCode(project, county, postalCode, intra = false) {

  let projectName = getProjectName();

  if (projectName === project) {
    if (document.querySelector('[ng-model="d17.val"]')) {
        var countyVal = document.querySelector(`[ng-model="d14.val"] option[label="${county}"]`);
        let countyDropdown = document.querySelector('[ng-model="d14.val"]');
        if (countyDropdown && county && !county.selected) { 
          selectOption(countyVal, countyDropdown);
        }
      if (postalCode !== '') {
        var postalField = document.querySelector('[ng-model="d17.val"]')
        if (document.querySelector('[ng-model="d21.val"]')) {
          if (postalField && postalField.value === "") {
          fillField(postalField, postalCode, false)
          }
        }
      }
        if (intra == true) {
          checkIntravilan()
        }
      }
    }
}

function checkIntravilan() {
  var checkbox = '.ng-empty[ng-model="d21.val"]'
	if (document.querySelector('[ng-model="d34.val"]')) {
    if (checkbox) {
     toggleCheckbox(checkbox, true);
     } 
  }
}

function selectZonaCoop(project) {
  let projectName = getProjectName();

  if (projectName === project) {
    var checkbox = '.ng-empty[ng-model="d89.val"]'
    if (document.querySelector('[ng-model="d92.val"]')) {
      if (checkbox) {
      toggleCheckbox(checkbox, true, true);
      } 
    }
  }
}

function selectImpr(project) {
  let projectName = getProjectName();

  if (projectName === project) {
    var checkbox = '.ng-empty[ng-model="d86.val"]'
    if (!checkIfDe() && !checkIfHc() && document.querySelector('[ng-model="d89.val"]')) {
      if (checkbox) {
      toggleCheckbox(checkbox, true, true);
      } 
    }
  }
}

//////////////////////////////////////////////////////////

                 /* PERSONALIZARI */

//////////////////////////////////////////////////////////

async function autoInscriere({actVal, tipInr = null, prov = false, tipDr = null, modDob = null, detaliiDr = null, refTer = true, poz, section = null, comentarii = null, note = null} = {}) {
  
  let act = actVal ? document.querySelector(`option[label="${actVal}"]`) : null
  let actDrop = document.querySelector('[ng-model="scopeRef.d20.val"]')
 
  let checkbox = '[ng-model="scopeRef.d16.val"]'
 
  let tipInrg = tipInr ? document.querySelector(`[ng-model="scopeRef.d4.val"] option[label="${tipInr}"]`) : null
  let insProv = document.querySelector('[ng-model="scopeRef.d4.val"] option[label="Inscrierea provizorie"]')
  let inrDrop = document.querySelector('[ng-model="scopeRef.d4.val"]')
 
  let modDobd = modDob ? document.querySelector(`[ng-model="scopeRef.d10.val"] option[label="${modDob}"]`) : null
  let modDrop = document.querySelector('[ng-model="scopeRef.d10.val"]')
 
  let tipDrp = tipDr ? document.querySelector(`[ng-model="scopeRef.d7.val"] option[label="${tipDr}"]`) : null
  let dreptDrop = document.querySelector('[ng-model="scopeRef.d7.val"]')
 
  let pozitie = document.querySelector('[ng-model="scopeRef.d23.val"]');
 
  let sectionVal = section ? document.querySelector(`[ng-model="scopeRef.d32.val"] option[label="${section}"]`) : null
  let sectionDrop = document.querySelector('[ng-model="scopeRef.d32.val"]')
 
  let detailsDr = document.querySelector('[ng-model="scopeRef.d13.val"]')
  let comments = document.querySelector('[ng-model="scopeRef.d56.val"]')
  let notes = document.querySelector('[ng-model="scopeRef.d53.val"]')
 
  nullSelected = document.querySelector(`[ng-model="scopeRef.d4.val"] option[value="object:null"]`).selected
  
  
  if (checkbox && actDrop && act && act.selected) {
   toggleCheckbox(checkbox, refTer);
 
   if (tipInrg) {
     if (inrDrop && nullSelected) { 
       selectOption(isProvizoriu() ? insProv : tipInrg, inrDrop);
     }
   }
 
   selectOption(modDobd, modDrop);
   selectOption(tipDrp, dreptDrop);
   selectOption(sectionVal, sectionDrop);
 
   if (detaliiDr && detailsDr.value === "") {
      await fillField(detailsDr, detaliiDr, false);
      detailsDr.focus()
    }
 
    if (comentarii && comments.value === "") {
      await fillField(comments, comentarii, false);
      comments.focus()
    }

    if (note && notes.value === "") {
      await fillField(notes, note, false);
      note.focus()
    }

    if (poz && pozitie.value === "") {
     let nextPoz = getValSection2();
     if (nextPoz === null) {
      var goodPoz = "1";
     }
     else {
      var goodPoz = nextPoz;
     }
     let pozVal = (parseInt(goodPoz, 10) + 1).toString()
     await fillField(pozitie, pozVal, false)
     pozitie.focus()
     }

    try {
      const quotaCheck = await getStorageItem('quota');
      if (quotaCheck) writeQuota();
    }
    catch (err) {
      console.error(err);
    }
   }
  }
 
 function replaceValues(field, initialText, correctedText) {
  if (field !== '') {
    if (document.querySelector(`${field}`)) {
      let myField = document.querySelector(`${field}`)
      let originalValue = myField.value;
      let newValue = originalValue.replace(new RegExp(initialText, 'g'), correctedText);
      if (originalValue !== newValue) {
        myField.value = '';
        fillField(myField, newValue, false);
      }
    }
  }
 }
 
 function writeValues(field, text) {
  if (field !== '') {
    if (document.querySelector(`${field}`) && document.querySelector(`${field}`).value.trim() === "") { 
      let myField = document.querySelector(`${field}`) 
      fillField(myField, `${text}`, false) 
    }
  }
}

 //////////////////////////////////////////////////////////

                   /* UAT FUNCTIONS */

//////////////////////////////////////////////////////////

// BRAILA
function writeCcValuesBR() {
  if (getJudetName() === 'Braila') {
    let measuredCC = document.querySelector('[ng-model="d10.val"]');
    let actCC = document.querySelector('[ng-model="d34.val"]');
    let totalCC = document.querySelector('[ng-model="d13.val"]');
    let etaj = document.querySelector('[ng-model="d20.val"]');
    let tax = document.querySelector('[ng-model="d26.val"]')
    
    let etajTotal = measuredCC.value * etaj.value
    
  if(actCC.value === '0') {
      fillField(actCC, ' ', false)
    } else if (measuredCC.value !== '') {
      if (totalCC.value !== etajTotal.toString() || measuredCC.value !== totalCC.value) {
        fillField(actCC, totalCC.value, false).then(() => {
          fillField(totalCC, etajTotal.toString(), false)
        })
      }
    }
    
    if (tax.value === '0' && actCC.value.trim() === '') {
      fillField(tax, ' ', false);
    } else if (actCC.value.trim() !== '' && tax.value !== '0') {
      fillField(tax, '0', false);
    }
  }
}

function writeTipCladireBR() {
  if (isProvizoriu() && document.querySelector('[ng-model="d30.val"].ng-empty') && getJudetName() === 'Braila') {
    toggleLegal('[ng-model="d30.val"].ng-not-empty', false)
  }

  const uncheckedLegal = document.querySelector('[ng-model="d30.val"].ng-empty');
  const selectElement = document.querySelector('.form-select[ng-model="d16.val"]');
  let selectedText = selectElement.options[selectElement.selectedIndex].text;
  let constrField = document.querySelector('[ng-model="d54.val"]');

  if (uncheckedLegal && constrField.value === '') {
    fillField(constrField, selectedText, false);
  }
}

function fillInMeasuredParcelBR() {
  if (getJudetName() === 'Braila') {
  if (document.querySelector('[ng-model="scopeRef.d53.val"]')) {
        let suprAct = document.querySelector('[ng-model="scopeRef.d47.val"]');
        let suprMas = document.querySelector('[ng-model="scopeRef.d50.val"]');
      if (suprMas) {
          if (suprMas.value == '' || suprMas.value === '0') {
              copyValue(suprMas, suprAct)
            }
          }
      }
  }
}

// CONSTANTA
function writeCcValuesCT() {
  let measuredCC = document.querySelector('[ng-model="d10.val"]');
  let actCC = document.querySelector('[ng-model="d34.val"]');
    
  if (measuredCC && document.querySelector('[ng-model="d47.val"]')) {
    if (actCC.value !== measuredCC.value) {
        actCC.value = ''
        fillField(actCC, measuredCC.value, false)
  }
}
}


function fillInMeasuredParcelCT() {
  if (getJudetName() === 'Constanta') {
  if (document.querySelector('[ng-model="scopeRef.d53.val"]')) {
        let suprfAct = document.querySelector('[ng-model="d72.val"]');
        let suprfMas = document.querySelector('[ng-model="d69.val"]');
      
      if (suprfMas.value !== suprfAct.value) {
      if (suprfMas && suprfMas.value == '') {
        copyValue(suprfMas, suprfAct)
        } else if (suprfAct && suprfAct.value == '') {
        copyValue(suprfAct, suprfMas)
        } else if (suprfMas && (suprfMas.value == '' || suprfMas.value === '0')) {		
        copyValue(suprfMas, suprfAct)
        } else if (suprfAct && (suprfAct.value == '' || suprfAct.value === '0')){
        copyValue(suprfAct, suprfMas)
        }
      }
      }
      
      // suprafata parcelelor
        let suprAct = document.querySelector('[ng-model="scopeRef.d47.val"]');
        let suprMas = document.querySelector('[ng-model="scopeRef.d50.val"]');
      if (document.querySelector('[ng-model="scopeRef.d53.val"]')) {
          if (suprMas && suprMas.value !== suprAct.value) {
              if (suprMas.value == '' || suprMas.value === '0') {
                  copyValue(suprMas, suprAct)
                  }
              }
          }
      }
}

//////////////////////////////////////////////////////////

              /* GENERAL HELPER FUNCTIONS */

//////////////////////////////////////////////////////////

const findNcValues = async () => {
  try {
    const ncListValue = await getStorageItem('ncList');
    return ncListValue;
  } catch (error) {
    console.error('Error fetching ncList:', error);
    throw error;
  }
}


const ncField = async() => {
  try {
  const ncFieldValue = await getStorageItem('searchInfo');
    return ncFieldValue;
  } catch (error) {
    console.error('Error fetching ncList:', error);
    throw error;
  }
}


function shortcut(keyCode, altKey = false, shiftKey = false, query, action = 'click', findNc = false) {
  document.addEventListener('keydown', function(event) {
      if (event.keyCode === keyCode && event.altKey === altKey && event.shiftKey === shiftKey) {
          var button = document.querySelector(query);
          if (button) {
              if (action === 'focus') {
                  button.focus();
              } 
              button.click();

              if (keyCode === 13) {
                  event.stopPropagation();
                  event.preventDefault();
              }
              if (event.altKey === altKey && keyCode === 68) {
                  event.stopPropagation();
                  event.preventDefault();
              }
              if (event.altKey === altKey && keyCode === 67 && findNc && findNcCheck) {
                event.stopPropagation();
                event.preventDefault();
                searchDOMForNumbers(findNcValues, ncField, 0, true, true)
              }
          }
      }
  });
}

function getProjectName() {
  let element = document.querySelector('.breadcrumb-item .d-inline-block');
  let title = element ? element.getAttribute('title') : null;
return title;
}

function getJudetName() {
  let element = document.querySelector('.breadcrumb-item:first-child span');
  let name = element ? element.textContent : null;
  return name;
}

function selectOption(element, dropdown) {
  if (element && !element.selected && dropdown) {
    element.selected = true;
    const event = new Event('change');
    dropdown.dispatchEvent(event);
    dropdown.focus();
  }
}

function getValSection2() {
  const rows = document.querySelectorAll('tr[ng-repeat="id283 in d283 track by id283.tId"]');
  let result = null;

  for (let i = rows.length - 1; i >= 0; i--) {
      const seventhTd = rows[i].querySelectorAll('td')[7];
      if (seventhTd && seventhTd.textContent.includes("2")) {
          result = rows[i].querySelector('td').innerText;
          break;
      }
  }
  return result;
};

function isProvizoriu() {
let ncField = document.querySelector('[ng-model="d56.val"]');
const rows = document.querySelectorAll('tr[ng-repeat="id224 in d224 track by id224.tId"]');

for (let i = 0; i < rows.length; i++) {
   const tds = rows[i].querySelectorAll('td');
   if (ncField.value === '') {
       if (tds[1].textContent.includes("13/3/1996")) {
           return true;
       }
   }
}
return false;
}

function checkIfDe() {
  const rows = document.querySelectorAll('tr[ng-repeat="id119 in d119 track by id119.tId"]');
  
  for (let i = 0; i < rows.length; i++) {
     const tds = rows[i].querySelectorAll('td');
      if (tds[6].textContent.includes("DR - CAI DE COMUNICATIE RUTIERE")) {
          return true;
     }
  }
  return false;
}

function checkIfHc() {
  const rows = document.querySelectorAll('tr[ng-repeat="id119 in d119 track by id119.tId"]');

  for (let i = 0; i < rows.length; i++) {
      const tds = rows[i].querySelectorAll('td');
      if (tds[6].textContent.includes("HR - APE CURGATOARE") || tds[1].textContent.includes("HB - APE STATATOARE")) {
          return true;
      }
  }
  return false;
}

function copyValue(a, b) {
	fillField(a, b.value, false)
	a.focus()
  }

function fillField(element, value, select) {
  return new Promise((resolve, reject) => {
    if (element) {
      element.focus();
      if (!select && element.value.length == 0) {
        simulateTyping(element, value, 0, resolve);
      } else if (!select && element.value === '0') {
        element.value = '';
        simulateTyping(element, value, 0, resolve);
      } else { 
        var event = new Event("change");
        element.value = value;
        element.dispatchEvent(event);
        resolve();
      }
    }
    element.blur();
    element.focus();
  });
}

function simulateTyping(element, value, i, done) {
  if (i < value.length) {
    element.value += value.charAt(i);
    element.dispatchEvent(new Event("change"));
    setTimeout(() => {
      i++;
      simulateTyping(element, value, i, done);
    }, 1);
  } else {
    done();
  }
}

function toggleCheckbox(selector, shouldCheck = true, shouldSave = false) {
  let changed = false;
  const checkbox = document.querySelector(selector);
  const saveBtn = document.querySelector('.btn.btn-sm.btn-success.btn-hover-scale');
  if (checkbox && !changed) {
      checkbox.checked = shouldCheck;
      const event = new Event('change');
      checkbox.dispatchEvent(event);
      changed = true;
      if (shouldSave && saveBtn) saveBtn.click();
  }
}

function toggleLegal(selector, shouldCheck = true) {
  const checkbox = document.querySelector(selector);
  if (checkbox) {
      checkbox.checked = shouldCheck;
      const event = new Event('change');
      checkbox.dispatchEvent(event);
  }
}

function dispatchEvent(element, eventType) {
  var event = new Event(eventType);
  element.dispatchEvent(event);
}

function unfocusBox(searchBox) {
  dispatchEvent(searchBox, 'focus');
  dispatchEvent(searchBox, 'blur');
}

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

let ncNotFound = '';

async function searchDOMForNumbers(list, field, index = 0, listYa = false, fieldYa = false) {

  if (listYa) {
    let num = await list()
    var numbers = num.split(" ").map(x => x.trim());
  }
  else {
    var numbers = list;
  }

  if (fieldYa) {
    var fieldz = await field()
  }
  else {
    var fieldz = field
  }

let searchBox = document.querySelector(fieldz);

  if (index >= numbers.length) {
      if (ncNotFound === '')
      {
        alert("Felicitări! Toate NC-urile introduse au fost găsite.")
      }
      else alert(`Următoarele numere cadastrale nu au fost găsite:${ncNotFound}`);
        return;
  }

  let number = numbers[index];
  
  searchBox.value = '';
  await fillFieldNc(searchBox, number, false);
  unfocusBox(searchBox);

  
  await sleep(1500);

  let currentRowCount = document.querySelectorAll('tr').length;

  if (currentRowCount <= 1) {
      ncNotFound += ' ' + number
      console.log(ncNotFound)
  }
  await searchDOMForNumbers(numbers, fieldz, index + 1);
}

function fillFieldNc(element, value) {
return new Promise((resolve) => {
  simulateTypingNc(element, value.toString(), 0, resolve);
});
}

function simulateTypingNc(element, value, i, done) {
if (i < value.length) {
  element.value += value.charAt(i);
  element.dispatchEvent(new Event("input"));
  setTimeout(() => {
    i++;
    simulateTypingNc(element, value, i, done);
  }, 20);
} else {
  done();
}
}