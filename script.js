// Função para criar um elemento de imagem
function createImageElement(src) {
  const imgElement = document.createElement('img');
  imgElement.src = src;
  imgElement.alt = 'Imagem';
  return imgElement;
}

// Função para criar um elemento de informações
function createInfoElement(nome, material, medida, tipo, valor) {
  const infoElement = document.createElement('div');
  infoElement.classList.add('informacoes');

  const nomeElement = document.createElement('h3');
  nomeElement.textContent = `Nome: ${nome || 'Sucata'}`;

  const materialElement = document.createElement('p');
  materialElement.textContent = `Material: ${material}`;

  const medidaElement = document.createElement('p');
  medidaElement.textContent = `Medida: ${medida}`;

  const tipoElement = document.createElement('p');
  tipoElement.textContent = `Tipo: ${tipo}`;

  const valorElement = document.createElement('p');
  valorElement.textContent = `Valor: R$ ${valor}`;

  const buttonElement = document.createElement('button');
  buttonElement.textContent = 'Selecionar';
  buttonElement.onclick = function () {
    selecionarImagem(nome || 'Sucata', material, medida, tipo, valor);
  };

  infoElement.appendChild(nomeElement);
  infoElement.appendChild(materialElement);
  infoElement.appendChild(medidaElement);
  infoElement.appendChild(tipoElement);
  infoElement.appendChild(valorElement);
  infoElement.appendChild(buttonElement);

  return infoElement;
}

// Função para adicionar o item na galeria
function addItemToGallery(imageSrc, nome, material, medida, tipo, valor, status) {
  if (status === 'vendido') {
    return; // Ignora itens com status "vendido"
  }

  const gallery = document.getElementById('gallery');
  const listItem = document.createElement('li');

  const imageElement = createImageElement(imageSrc);
  const infoElement = createInfoElement(nome, material, medida, tipo, valor);

  listItem.appendChild(imageElement);
  listItem.appendChild(infoElement);

  gallery.appendChild(listItem);
}

// Função para selecionar a imagem (altere conforme sua necessidade)
function selecionarImagem(nome, material, medida, tipo, valor) {
  console.log(`Imagem selecionada: ${nome}, ${material}, ${medida}, ${tipo}, ${valor}`);
}

// Função para carregar o CSV e criar a galeria
function loadCSVAndCreateGallery() {
  const csvFile = 'lista.csv';
  Papa.parse(csvFile, {
    download: true,
    header: true,
    complete: function (results) {
      results.data.forEach(item => {
        addItemToGallery(
          item.caminho_imagem,
          item.nome,
          item.material,
          item.medida,
          item.tipo,
          item.valor,
          item.status
        );
      });
    }
  });
}

// Chama a função para carregar o CSV e criar a galeria quando a página estiver pronta
document.addEventListener('DOMContentLoaded', loadCSVAndCreateGallery);
