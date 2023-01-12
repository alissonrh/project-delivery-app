const getStatusColour = (orderStatus) => {
  let statusColour = '';
  switch (orderStatus) {
  case 'Entregue':
    statusColour = 'bg-[#2FC18C]';
    break;
  case 'Em Trânsito':
    statusColour = 'bg-[#0d99ff]';
    break;
  case 'Preparando':
    statusColour = 'bg-[#87d53c]';
    break;
  default:
    statusColour = 'bg-[#d3c63c]';
  }
  return statusColour;
};

export default getStatusColour;
