const dummyIssueList = [
  {
    shortIssue: "coronavirus",
    longIssue: "Coronavirus and health",
    link: "https://www.gov.uk/coronavirus",
  },
  {
    shortIssue: "school",
    longIssue: "School or study",
    link: "https://enquire.org.uk/advice-young-people/",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { data: dummyIssueList }, (response) => {
        const tabTitle = response.data;
        const titlePara = document.querySelector("#tabtitle");
        titlePara.textContent = `This tab's title: ${tabTitle}`;
    });
  });
});
