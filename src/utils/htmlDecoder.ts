const htmlDecode = (input: string) => {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

export default htmlDecode;
