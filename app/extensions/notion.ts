export {};

declare global {
  interface String {
    separateNotionPageId(): String;
  }
}

// https://developers.notion.com/docs/working-with-page-content#:~:text=The%20URL%20ends%20in%20a,of%20characters%20between%20the%20hyphens).
String.prototype.separateNotionPageId = function () {
  const group = this.match(/[0-9a-z]{32}/g);

  if (group == undefined) {
    return this;
  }

  let result = this;
  for (let item of group) {
    result = result.replace(
      item,
      `${item.slice(0, 8)}-${item.slice(8, 12)}-${item.slice(12, 16)}-${item.slice(16, 20)}-${item.slice(20, 32)}`,
    );
  }

  return result;
};
