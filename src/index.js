const ts = require("typescript");
const esprima = require("esprima");
const Semantic = require("./semantic");

const compileButton = document.querySelector("#compile-button");
const codeEditorContainer = document.querySelector("#editor");
const tokensContainer = document.querySelector("#tokens");
const astContainer = document.querySelector("#ast");
const generatedCodeContainer = document.querySelector("#generated-code");
const errorsContainer = document.querySelector("#errors");
const symbolTableContainer = document.querySelector("#symbol-table > tbody");

function tsCompile(src, options) {
  return ts.transpileModule(src, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2016,
      noImplicitAny: true,
      noEmitOnError: true,
      removeComments: true,
      sourceMap: false,
      ...options,
    },
  });
}

const analyzeCode = (code) => {
  const transpiledCode = tsCompile(code);
  const tree = esprima.parse(transpiledCode.outputText);
  const tokens = esprima.tokenize(transpiledCode.outputText);

  tokensContainer.value = JSON.stringify(tokens, null, 2);

  astContainer.value = JSON.stringify(tree, null, 2);

  const semantic = new Semantic(tree);
  semantic.analyze(tree);
  updateList(semantic.errors);
  updateTable(semantic.symbolTable);

  generatedCodeContainer.value = transpiledCode.outputText;

  return transpiledCode.outputText;
};

const download = (filename = "code.js") => {
  const code = codeEditorContainer.value;
  const text = analyzeCode(code);
  const element = document.createElement("a");

  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );

  element.setAttribute("download", filename);

  element.style.display = "none";

  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

function updateTable(tableData) {
  symbolTableContainer.innerHTML = "";

  tableData.forEach(function (rowData) {
    const row = document.createElement("tr");

    let cell = document.createElement("td");
    cell.appendChild(document.createTextNode(rowData.identifier));
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.appendChild(document.createTextNode(rowData.scope));
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.appendChild(document.createTextNode(rowData.kind));
    row.appendChild(cell);

    symbolTableContainer.appendChild(row);
  });
}

function updateList(listData) {
  errorsContainer.innerHTML = "";

  listData.forEach(function (error) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(error));
    errorsContainer.appendChild(li);
  });
}

compileButton.addEventListener("click", () => {
  download();
});

codeEditorContainer.addEventListener("keyup", () => {
  const code = codeEditorContainer.value;
  analyzeCode(code);
});

const defaultCode = `
const x: Number = 10;
const y: Number = 20;

const result: Number = x * y;
`;

codeEditorContainer.value = defaultCode;
analyzeCode(defaultCode);
