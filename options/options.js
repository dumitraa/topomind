function createXPathFromElement(elm) {
  var allNodes = document.getElementsByTagName('*');
  for (var segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) {
    if (elm.hasAttribute('id')) {
      var uniqueIdCount = 0;
      for (var n = 0; n < allNodes.length; n++) {
        if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++;
        if (uniqueIdCount > 1) break;
      };
      if (uniqueIdCount == 1) {
        segs.unshift('id("' + elm.getAttribute('id') + '")');
        return segs.join('/');
      } else {
        segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]');
      }
    } else if (elm.hasAttribute('class')) {
      segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]');
    } else {
      for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) {
        if (sib.localName == elm.localName) i++;
      };
      segs.unshift(elm.localName.toLowerCase() + '[' + i + ']');
    };
  };
  return segs.length ? '/' + segs.join('/') : null;
};

function lookupElementByXPath(path) {
  let evaluator = new XPathEvaluator(),
    result = evaluator.evaluate(path, document.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  return result.singleNodeValue;
};


emailjs.init('RQOFhKNX0EgdqSjT8');

document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.querySelector('.thankYou').style.display = 'none';
  document.querySelector('.error.feedback').style.display = 'none';

  const feedback = {
    reason: document.getElementById('reason').value,
    section: document.getElementById('sectionFeedback').value,
    subject: document.getElementById('subject').value,
    details: document.getElementById('details').value,
    contact: document.getElementById('contact').value,
  };

  sendFeedback(feedback);
});

function sendFeedback(feedback) {
  const templateParams = {
    reason: feedback.reason,
    section: feedback.section,
    subject: feedback.subject,
    details: feedback.details,
    contact: feedback.contact,
  };

  emailjs.send('service_r0gwk7m', 'template_s0wy6wj', templateParams)
    .then(function(response) {
      document.querySelector('.thankYou').style.display = 'block';
    }, function(error) {
      document.querySelector('.error.feedback').style.display = 'block';
    });
}


document.addEventListener('change', function(event) {
  if (event.target.id.startsWith('tipInregistrare')) {
    const tipDrept = event.target.closest('.custom-row').querySelector('[id^="tipDrept"]');
    const modDobandire = event.target.closest('.custom-row').querySelector('[id^="modDobandire"]');
    const detaliiDr = event.target.closest('.custom-row').querySelector('[id^="detalii"]');
    const notes = event.target.closest('.custom-row').querySelector('[id^="note"]');

    if (event.target.value === 'Notare') {
      if (tipDrept) tipDrept.setAttribute('disabled', true);
      if (modDobandire) modDobandire.setAttribute('disabled', true);
      if (detaliiDr) detaliiDr.setAttribute('disabled', true);
      if (notes) notes.removeAttribute('disabled', true);
    } else {
      if (tipDrept) tipDrept.removeAttribute('disabled');
      if (modDobandire) modDobandire.removeAttribute('disabled');
      if (detaliiDr) detaliiDr.removeAttribute('disabled');
      if (notes) {
        notes.value = '';
        notes.setAttribute('disabled', true);
      }
    }
  }
});


function getNextID(prefix, projectContainer) {
  let highestID = 0;

  const elements = projectContainer.querySelectorAll(`[id^="${prefix}"]`);

  elements.forEach(element => {
    const currentID = parseInt(element.id.replace(prefix, ''), 10);
    if (currentID > highestID) {
      highestID = currentID;
    }
  });

  return highestID + 1;
}

function createRow(projectContainer, rowType) {

  const newRow = document.createElement('div');
  newRow.classList.add('custom-row');

  if (rowType === "multi") {
    let nextMulti = getNextID('addy', projectContainer);
    newRow.innerHTML = `
    <input type="checkbox" id="addy${nextMulti}"class="main-row-checkbox">
    <input type="text" id="name${nextMulti}" class="row-input project" placeholder="Numele proiectului" readonly>
    <input type="text" id="satname${nextMulti}" class="row-input name" placeholder="Numele satului" readonly>
    <input type="number" id="postcode${nextMulti}" class="row-input code" placeholder="Codul poștal" readonly>
    <div class="special checkbox-wrapper">
      <input id="intravilanCheck${nextMulti}" type="checkbox" class="row-checkbox intra">
      <label for="intravilanCheck${nextMulti}" id="intravilly${nextMulti}">Intravilan</label>
    </div>
  `
  } else if (rowType === "multi-w") {
    let nextMultiW = getNextID('writeValues', projectContainer);
    newRow.innerHTML = `
    <input type="checkbox" id="writeValues${nextMultiW}" class="main-row-checkbox">
    <select id="writeSelect${nextMultiW}">
      <option value="" selected>Câmpul în care se va scrie textul</option>>
      <option value="[class='col'] [ng-model='d79.val']">Note imobil</option>
      <option value="[class='col-12'] [ng-model='d57.val']">Notițe parcelă</option>
      <option value="[class='col'] [ng-model='d47.val']">Note act</option>
      <option value="[class='col-12'] [ng-model='d50.val']">Note proprietar</option>
      <option value="[ng-model='scopeRef.d56.val']">Comentarii înscriere</option>
      <option value="[ng-model='scopeRef.d53.val']">Notări înscriere</option>
    </select>
    <input type="text" id="desiredText${nextMultiW}" class="row-input text" placeholder="Text dorit" readonly>
    `
  } else if (rowType === "multi-m") {
    let nextMultiM = getNextID('replaceValues', projectContainer);
    newRow.innerHTML = `                          
    <input type="checkbox" id="replaceValues${nextMultiM}" class="main-row-checkbox">
    <select id="modif${nextMultiM}">
      <option value="" selected>Câmpul în care se face modificarea</option>
      <option value="[class='col'] [ng-model='d79.val']">Note imobil</option>
      <option value="[class='col-12'] [ng-model='d57.val']">Notițe parcelă</option>
      <option value="[class='col'] [ng-model='d47.val']">Note act</option>
      <option value="[class='col-12'] [ng-model='d50.val']">Note proprietar</option>
      <option value="[ng-model='scopeRef.d56.val']">Comentarii înscriere</option>
      <option value="[ng-model='scopeRef.d53.val']">Notări înscriere</option>
    </select>
    <input type="text" id="initialT${nextMultiM}" class="row-input initialText" placeholder="Text inițial" readonly>
    <input type="text" id="actualT${nextMultiM}" class="row-input newText" placeholder="Text modificat" readonly>
    `
  } else if (rowType === "single") {
    let nextSingle = getNextID('bifaCoopProj', projectContainer);
    newRow.innerHTML = `
    <input type="checkbox" id="bifaCoopProj${nextSingle}" class="main-row-checkbox">
    <input type="text" id="coopProj${nextSingle}" class="row-input project" placeholder="Numele proiectului" readonly>
    `
  } else if (rowType === "single2") {
    let nextSingle2 = getNextID('bifaImprProj', projectContainer);
    newRow.innerHTML = `
      <input type="checkbox" id="bifaImprProj${nextSingle2}" class="main-row-checkbox">
      <input type="text" id="imprProj${nextSingle2}" class="row-input project" placeholder="Numele proiectului" readonly>
      `
  } else if (rowType === "complex") {
    let nextComplex = getNextID('ins', projectContainer);
    newRow.innerHTML = `
    <input type="checkbox" id="ins${nextComplex}" class="main-row-checkbox">
    <div class="left-column">
        <input type="text" id="actName${nextComplex}" class="row-input project name-only required" placeholder="Nr.act" readonly required>
        <div class="select-column">
            <select id="tipInregistrare${nextComplex}" class="required" required>
                            <option value="" selected>Tip inregistrare</option>
                            <option value="Intabulare">Intabulare</option>
                            <option value="Notare">Notare</option>
                            <option value="Inscrierea posesiei">Inscrierea posesiei</option>
                            <option value="Inscrierea provizorie">Inscrierea provizorie</option>
                          </select>
                          <select id="tipDrept${nextComplex}">
                            <option value="" selected>Tip drept</option>
                            <option value="Proprietate">Proprietate</option>
                            <option value="Administrare">Administrare</option>
                            <option value="Comodat">Comodat</option>
                            <option value="Concesiune">Concesiune</option>
                            <option value="Folosinta">Folosinta</option>
                            <option value="Folosinta speciala">Folosinta speciala</option>
                            <option value="Folosinta cu titlu gratuit">Folosinta cu titlu gratuit</option>
                            <option value="Habitatie">Habitatie</option>
                            <option value="Inchiriere">Inchiriere</option>
                            <option value="Ipoteca">Ipoteca</option>
                            <option value="Ipoteca legala">Ipoteca legala</option>
                            <option value="Leasing imobiliar">Leasing imobiliar</option>
                            <option value="Privilegiu imobiliar">Privilegiu imobiliar</option>
                            <option value="Superficie">Superficie</option>
                            <option value="Servitute">Servitute</option>
                            <option value="Uz">Uz</option>
                            <option value="Uzufruct">Uzufruct</option>
                            <option value="Uzufruct viager">Uzufruct viager</option>
                          </select>
                          <select id="modDobandire${nextComplex}">
                            <option value="" selected>Mod Dobandire</option>
                            <option value="Accesiune">Accesiune</option>
                            <option value="Constituire">Constituire</option>
                            <option value="Construire">Construire</option>
                            <option value="Conventie">Conventie</option>
                            <option value="Expropriere">Expropriere</option>
                            <option value="Hotarare judecatoreasca">Hotarare judecatoreasca</option>
                            <option value="Iesire din indiviziune">Iesire din indiviziune</option>
                            <option value="Lege">Lege</option>
                            <option value="Succesiune">Succesiune</option>
                            <option value="Uzucapiune">Uzucapiune</option>
                            <option value="Adjudecare">Adjudecare</option>
                            <option value="Reconstituire">Reconstituire</option>
                          </select>
                          <select id="section${nextComplex}">
                          <option value="">Sectiune</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          </select>
                        </div>
                      </div>
                      <div class="right-column">
                      <div class="checkbox-label">
                          <input id="referaTerenul${nextComplex}" type="checkbox" class="row-checkbox refera" checked />
                          <label for="referaTerenul${nextComplex}" id="refera${nextComplex}" class="checkbox-text">Referă terenul</label>
                      </div>
                      <div class="checkbox-label">
                      <input id="poz${nextComplex}" type="checkbox" class="row-checkbox poz">
                      <label for="poz${nextComplex}" id="continuePoz${nextComplex}" class="checkbox-text">Continuă numerotatea (P2)</label>
                      </div>
                      <input type="text" id="detalii${nextComplex}" class="row-input ins-input name" placeholder="Detalii drept" readonly>
                      <input type="text" id="comment${nextComplex}"class="row-input ins-input name" placeholder="Comentarii" readonly>
                      <textarea type="text" id="note${nextComplex}" class="row-input ins-input name" placeholder="Notări" readonly></textarea>
                  </div>
                    `
  }

  if (projectContainer && projectContainer.querySelector('.add-project')) {
    const addButton = projectContainer.querySelector('.add-project');
    projectContainer.insertBefore(newRow, addButton);
  }

  return newRow;
}


const addProjectButtons = document.querySelectorAll('.add-project');

addProjectButtons.forEach((button) => {
  button.addEventListener('click', function(event) {
    const suppressErrors = event.detail && event.detail.suppressErrors;

    let parentTabPane = this.closest('.tab-pane');
    if (!parentTabPane.classList.contains('active')) {
      return;
    }
    
  if (event.target.classList.contains('add-project')) {
    event.stopPropagation()
    event.preventDefault()

    const projectContainer = event.target.closest('.project-container');
    const rowType = projectContainer.getAttribute('data-row-type');
    const errorMsg = projectContainer.querySelector('.error');
    const customRows = projectContainer.querySelectorAll('.custom-row');

    errorMsg.style.display = "none";
    let isValidArray = [];
    let isNotEmpty;

    if (rowType === "multi" || rowType === "single") {
      isNotEmpty = Array.from(customRows).every(row => {
        return Array.from(row.querySelectorAll('.row-input')).every(input => input.value !== "");
      });

      isValidArray.push(isNotEmpty);
    } else if (rowType === "multi-w" || rowType === "multi-m") {
      isNotEmpty = Array.from(customRows).every(row => {
        return Array.from(row.querySelectorAll('.row-input, select')).every(el => {
          if (el.tagName === "SELECT") {
            return el.selectedIndex > 0 || el.value !== '';
          }
          return el.value !== "";
        });
      });

      isValidArray.push(isNotEmpty);
    } else if (rowType === "complex") {
      customRows.forEach(row => {
        const requiredInput = row.querySelector('[id^="actName"]');
        const otherElements = row.querySelectorAll('.row-input:not(.required), select, input[type="checkbox"]');

        isNotEmpty = requiredInput.value !== "" && Array.from(otherElements).some(el => {
          if (el.tagName === "SELECT") {
            return el.selectedIndex > 0 || el.value !== '';
          }
          if (el.type === "checkbox") {
            return el.checked;
          }
          return el.value !== "";
        });

        isValidArray.push(isNotEmpty);
      });
    }

    const isFormValid = isValidArray.every(Boolean);
    if (!isFormValid && !suppressErrors) {
      errorMsg.style.display = "block";
      return;
    }
    else {
      errorMsg.style.display = "none";
    }

    if (rowType === "multi") {
      createRow(projectContainer, 'multi')
    } else if (rowType === "multi-w") {
      createRow(projectContainer, 'multi-w')
    } else if (rowType === "multi-m") {
      createRow(projectContainer, 'multi-m')
    } else if (rowType === "single") {
      createRow(projectContainer, 'single')
    } else if (rowType === "single2") {
      createRow(projectContainer, 'single2')
    } else if (rowType === "complex") {
      createRow(projectContainer, 'complex')
    }
  }
});
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('row-input')) {
    const row = event.target.closest('.custom-row');
    row.querySelectorAll('.row-input').forEach(input => input.removeAttribute('readonly'));
  }
});

document.addEventListener('blur', function(event) {
  if (event.target.classList.contains('row-input')) {
    const row = event.target.closest('.custom-row');
    row.querySelectorAll('.row-input').forEach(input => input.setAttribute('readonly', true));
  }
}, true);

document.addEventListener('DOMContentLoaded', (event) => {
  const myTabs = document.getElementById('myTabs');

  myTabs.addEventListener('show.bs.tab', function(event) {

    const oldTabContentId = event.relatedTarget.getAttribute('href');
    const oldTabContent = document.querySelector(oldTabContentId);

    if (oldTabContent) {
      const collapsibles = oldTabContent.querySelectorAll('.accordion-collapse.show');
      collapsibles.forEach((collapsible) => {
        const bsCollapse = new bootstrap.Collapse(collapsible, {
          toggle: false
        });
        bsCollapse.hide();
      });

      oldTabContent.querySelectorAll('.error').forEach(error => {
        error.style.display = "none";
      });
    }
  });
});


function refreshStorage() {
  chrome.storage.local.get(['mainOptions']).then((result) => {
    if (result.mainOptions) {
      try {
        const searchMatchingInputs = function(option) {
          let foundIdEl = false;
          document.querySelectorAll('.tab-pane input, .tab-pane select, .tab-pane textarea').forEach(function(el) {
            if (option.key === el.getAttribute('id')) {
              el[el.type === 'checkbox' ? 'checked' : 'value'] = option.value;
              foundIdEl = true;
            }
          });
          return foundIdEl;
        }
        const parsedData = JSON.parse(result.mainOptions);
        parsedData.forEach(function(option) {
          let foundIdEl = searchMatchingInputs(option);
          if (!foundIdEl) {
            let el = lookupElementByXPath(option.key);
            if (el) {
              el[el.type === 'checkbox' ? 'checked' : 'value'] = option.value;
            } else {
              let existingContainer = document.querySelectorAll('#' + option.key.replace(/\d+$/, ""));
              if (existingContainer && existingContainer[0]) {
                let event = new CustomEvent('click', { detail: { suppressErrors: true } });
                existingContainer[0].closest('.rowContainer').querySelector('.btn-primary').dispatchEvent(event);              }
              searchMatchingInputs(option);
            }
          }

        });
      } catch (e) {
      }
    }
  });
}

function createAutoInscriereObj(row, rowIndex) {
  const idSuffix = rowIndex === 0 ? '' : rowIndex;
  const elem = row.querySelector(`#ins${idSuffix}`);

  if (elem) {
  const values = {
    checker: row.querySelector(`#ins${idSuffix}`).checked,
    actVal: row.querySelector(`#actName${idSuffix}`).value,
    tipInr: row.querySelector(`#tipInregistrare${idSuffix}`).value,
    tipDr: row.querySelector(`#tipDrept${idSuffix}`).value,
    modDob: row.querySelector(`#modDobandire${idSuffix}`).value,
    detaliiDr: row.querySelector(`#detalii${idSuffix}`).value,
    refTer: row.querySelector(`#referaTerenul${idSuffix}`).checked,
    poz: row.querySelector(`#poz${idSuffix}`).checked,
    section: row.querySelector(`#section${idSuffix}`).value,
    coment: row.querySelector(`#comment${idSuffix}`).value,
    note: row.querySelector(`#note${idSuffix}`).value,
  };

  const defaultStates = {
    refTer: true,
    poz: false,
    checker: false,
  };

  const allEmpty = !Object.values(values).some((value, index) => {
    const key = Object.keys(values)[index];
    if (typeof value === 'boolean') {
      return value !== defaultStates[key];
    }
    return value && value.trim() !== '';
  });

  if (!allEmpty) {
    return values;
  }

  return null;
}
}




function createAdresaObj(row, rowIndex) {

  // same as createautoinscriereobj, only get the non null values

  const idSuffix = rowIndex === 0 ? '' : rowIndex;
  const elem = row.querySelector(`#postcode${idSuffix}`);

  if (elem) {
  const values = {
    addy: row.querySelector(`#addy${idSuffix}`).checked,
    name: row.querySelector(`#name${idSuffix}`).value,
    satName: row.querySelector(`#satname${idSuffix}`).value,
    postcode: row.querySelector(`#postcode${idSuffix}`).value,
    intra: row.querySelector(`#intravilanCheck${idSuffix}`).checked,
  };

  const allEmpty = !Object.values(values).some(value => {
    return typeof value === 'boolean' ? value : (value && value.trim() !== '');
  }
  );

  if (!allEmpty) {
    return values;
  }

  return null;
}
}

function createZonaCoopObj(row, rowIndex) {

  const idSuffix = rowIndex === 0 ? '' : rowIndex;
  const elem = row.querySelector(`#coopProj${idSuffix}`);

  if (elem) {
  const values = {
    bifaCoopProj: row.querySelector(`#bifaCoopProj${idSuffix}`).checked,
    coopProj: row.querySelector(`#coopProj${idSuffix}`).value,
  };

  const allEmpty = !Object.values(values).some(value => {
    return typeof value === 'boolean' ? value : (value && value.trim() !== '');
  }
  );

  if (!allEmpty) {
    return values;
  }

  return null;
}
}

function createZonaImprObj(row, rowIndex) {

  const idSuffix = rowIndex === 0 ? '' : rowIndex;
  const elem = row.querySelector(`#imprProj${idSuffix}`);

  if (elem) {
  const values = {
    bifaImprProj: row.querySelector(`#bifaImprProj${idSuffix}`).checked,
    imprProj: row.querySelector(`#imprProj${idSuffix}`).value,
  };

  const allEmpty = !Object.values(values).some(value => {
    return typeof value === 'boolean' ? value : (value && value.trim() !== '');
  }
  );

  if (!allEmpty) {
    return values;
  }

  return null;
}
}

function createWriteValuesObj(row, rowIndex) {

  const idSuffix = rowIndex === 0 ? '' : rowIndex;
  const elem = row.querySelector(`#writeValues${idSuffix}`);

  if (elem) {
  const values = {
    write: row.querySelector(`#writeValues${idSuffix}`).checked,
    field: row.querySelector(`#writeSelect${idSuffix}`).value,
    text: row.querySelector(`#desiredText${idSuffix}`).value,
  };

  const allEmpty = !Object.values(values).some(value => {
    return typeof value === 'boolean' ? value : (value && value.trim() !== '');
  }
  );

  if (!allEmpty) {
    return values;
  }

  return null;
}
}

function createReplaceValuesObj(row, rowIndex) {

  const idSuffix = rowIndex === 0 ? '' : rowIndex;
  const elem = row.querySelector(`#replaceValues${idSuffix}`);

  if (elem) {
  const values = {
    replace: row.querySelector(`#replaceValues${idSuffix}`).checked,
    field: row.querySelector(`#modif${idSuffix}`).value,
    initialText: row.querySelector(`#initialT${idSuffix}`).value,
    correctedText: row.querySelector(`#actualT${idSuffix}`).value,
  };

  const allEmpty = !Object.values(values).some(value => {
    return typeof value === 'boolean' ? value : (value && value.trim() !== '');
  }
  );

  if (!allEmpty) {
    return values;
  }
  
  return null;
}
}

function saveStorage() {
  return new Promise((resolve, reject) => {
    let storageArray = [];
    document.querySelectorAll('.tab-pane').forEach(function(tab) {
      tab.querySelectorAll('input, select, textarea').forEach(function(el) {
        let value;
        if (el.tagName === 'TEXTAREA') {
            value = el.value;
        } else {
            value = el.getAttribute('type') === 'checkbox' ? el.checked : el.value;
        }
            if ((typeof value === 'string' && value.trim() !== '') || typeof value === 'boolean') {
          if (el.getAttribute('id')) {
            storageArray.push({
              key: el.getAttribute('id'),
              value: value
            });
          } else {
            storageArray.push({
              key: createXPathFromElement(el),
              value: value
            });
          }
        }
      });
    });
  
    const rows = document.querySelectorAll('.custom-row');

    const autoInscriereRows = Array.from(rows).filter(row => row.querySelectorAll('[id^="ins"]').length > 0);
    const adresaRows = Array.from(rows).filter(row => row.querySelectorAll('[id^="addy"]').length > 0);
    const zonaCoopRows = Array.from(rows).filter(row => row.querySelectorAll('[id^="bifaCoopProj"]').length > 0);
    const zonaImprRows = Array.from(rows).filter(row => row.querySelectorAll('[id^="bifaImprProj"]').length > 0);
    const writeValuesRows = Array.from(rows).filter(row => row.querySelectorAll('[id^="writeValues"]').length > 0);
    const replaceValuesRows = Array.from(rows).filter(row => row.querySelectorAll('[id^="replaceValues"]').length > 0);

    const autoInscriereData = autoInscriereRows.map((row, index) => createAutoInscriereObj(row, index)).filter(obj => obj !== null);
    const adresaData = adresaRows.map((row, index) => createAdresaObj(row, index)).filter(obj => obj !== null);
    const zonaCoopData = zonaCoopRows.map((row, index) => createZonaCoopObj(row, index)).filter(obj => obj !== null);
    const zonaImprData = zonaImprRows.map((row, index) => createZonaImprObj(row, index)).filter(obj => obj !== null);
    const writeValuesData = writeValuesRows.map((row, index) => createWriteValuesObj(row, index)).filter(obj => obj !== null);
    const replaceValuesData = replaceValuesRows.map((row, index) => createReplaceValuesObj(row, index)).filter(obj => obj !== null);
    
    chrome.storage.local.set({
      mainOptions: JSON.stringify(storageArray),
      autoInscriereData: JSON.stringify(autoInscriereData),
      adresaData: JSON.stringify(adresaData),
      zonaCoopData: JSON.stringify(zonaCoopData),
      zonaImprData: JSON.stringify(zonaImprData),
      writeValuesData: JSON.stringify(writeValuesData),
      replaceValuesData: JSON.stringify(replaceValuesData),
    }).then(() => {
      resolve();
    }).catch((error) => {
      reject(error);
    })
  })
}

const tabLinks = document.querySelectorAll('a[data-bs-toggle="tab"]');
tabLinks.forEach((tabLink) => {
  tabLink.addEventListener('click', function(e) {
    e.preventDefault();
    const tabID = e.target.getAttribute('href').substring(1);
    const tabElement = document.getElementById(tabID);
    if (tabElement) refreshStorage();
  });
});

document.querySelectorAll('.saveBtn').forEach((button) => {
  button.addEventListener('click', function(event) {
    this.nextElementSibling.style.display = "none"; 
    this.nextElementSibling.nextElementSibling.style.display = "none"; 

    saveStorage().then(() => { 
      this.nextElementSibling.style.display = "block"; 
    }).catch((error) => {
      console.error('Failed to save settings:', error);
      this.nextElementSibling.nextElementSibling.style.display = "block"; 
    });
  });
});

document.addEventListener("DOMContentLoaded", refreshStorage);
function checkFirstVisit() {
  chrome.storage.local.get('hasVisited', function(result) {
      if (result.hasVisited) {
          showTab('general');
      } else {
          showTab('about');
          chrome.storage.local.set({ 'hasVisited': true });
      }
  });
}

function showTab(tabName) {
  document.querySelectorAll('.nav-link, .tab-pane').forEach(elem => {
      elem.classList.remove('active', 'show');
  });
  document.querySelector(`#${tabName}-tab`).classList.add('active');
    document.querySelector(`#${tabName}`).classList.add('show', 'active');
}

document.addEventListener('DOMContentLoaded', function() {
  checkFirstVisit();
});

function updateMainCheckbox(mainCheckbox, childCheckboxes) {
  const allChecked = [...childCheckboxes].every(checkbox => checkbox.checked);
  const someChecked = [...childCheckboxes].some(checkbox => checkbox.checked);

  mainCheckbox.checked = allChecked;
  mainCheckbox.indeterminate = someChecked && !allChecked;
}

document.addEventListener('DOMContentLoaded', function() {
const accordionContainer = [document.getElementById('proiecteAccordion'), document.getElementById('customAccordion')]; // Replace with your accordion container ID

accordionContainer.forEach(accordion => {
  accordion.addEventListener('click', function(event) {
    if (event.target.classList.contains('selectAll')) {
      const parentElement = event.target.closest('.accordion-header').nextElementSibling.querySelector('.accordion-body');
      const childCheckboxes = parentElement.querySelectorAll('.main-row-checkbox');
      childCheckboxes.forEach(childCheckbox => childCheckbox.checked = event.target.checked);
      updateMainCheckbox(event.target, childCheckboxes);
    }
  })
});

accordionContainer.forEach(accordion => {
  accordion.addEventListener('click', function(event) {
    if (event.target.classList.contains('main-row-checkbox')) {
      const accordionHeader = event.target.closest('.accordion-collapse').previousElementSibling;
      const mainCheckbox = accordionHeader.querySelector('.selectAll');
      const childCheckboxes = accordionHeader.nextElementSibling.querySelector('.accordion-body').querySelectorAll('.main-row-checkbox');
      updateMainCheckbox(mainCheckbox, childCheckboxes);
    }
  });
});
});

document.getElementById('ncList').addEventListener('paste', function(e) {
  e.preventDefault();

  let clipboardData = e.clipboardData || window.clipboardData;
  let pastedData = clipboardData.getData('Text');

  let processedData = pastedData.replace(/\r\n|\n|\r/gm, " ");

  this.value = this.value + processedData;
});