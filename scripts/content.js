const dummyIssueList = [
  {
    shortIssue: "coronavirus",
    longIssue: "Coronavirus and health",
    link:
      "https://www.themix.org.uk/mental-health/anxiety-ocd-and-phobias/how-to-deal-with-corona-anxiety-35761.html",
  },
  {
    shortIssue: "school",
    longIssue: "school or study",
    link: "https://www.themix.org.uk/work-and-study",
  },
];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  sendResponse({ data: document.title, success: true });
  // const issueList = request.data;
});

const buildAlertPopup = () => {
  const docTitle = document.title.toLowerCase();
  const currentIssue = dummyIssueList.filter((entry) => {
    return docTitle.includes(entry.shortIssue) ? entry : null;
  })[0];

  if (currentIssue) {
    const alert = document.createElement("section");
    const title = document.createElement("h2");
    title.append("Young People's Support Popup (extension)");
    title.setAttribute("style", "display: none;");
    alert.setAttribute(
      "style",
      "position: fixed; bottom: 0; left: 0; z-index: 10000; width: 100vw; display: flex; flex-direction: row; justify-content: space-between; align-items: center; height: 100px; background-color: #F7F7FA; color: #474747; padding: 25px"
    );

    const mascot = document.createElement("IMG");
    mascot.src = chrome.runtime.getURL("./images/soandso.svg");
    mascot.alt = "Yp Support popup mascot image";
    mascot.setAttribute("style", "width: 100px; height: 100px;");

    const paraOne = document.createElement("p");
    paraOne.textContent = `Are you worried about ${currentIssue.longIssue}?`;
    paraOne.setAttribute(
      "style",
      "font-family: 'Segoe UI', 'Lucida Grande', Tahoma, sans-serif; font-size: 2rem; margin: 0; padding:0;"
    );
    const paraTwo = document.createElement("p");
    paraTwo.textContent = `I might have a useful link for you...click `;
    paraTwo.setAttribute(
      "style",
      "font-family: 'Segoe UI', 'Lucida Grande', Tahoma, sans-serif; font-size: 2rem; margin: 0; padding:0;"
    );
    const paraDiv = document.createElement("div");
    paraDiv.append(paraOne, paraTwo);

    const link = document.createElement("a");
    link.append("here");
    link.href = currentIssue.link;
    link.target = "_blank";
    link.setAttribute(
      "style",
      "color: #007AFF; font-weight: 700; text-decoration: none; font-family: 'Segoe UI', 'Lucida Grande', Tahoma, sans-serif; font-size: 2rem; margin: 0; padding:0;"
    );
    paraTwo.appendChild(link);

    let closeButton = document.createElement("IMG");
    closeButton.src = chrome.runtime.getURL("./images/close.svg");
    closeButton.alt = "close this alert";
    closeButton.setAttribute(
      "style",
      "align-self: start; margin-right: 50px; cursor:pointer;"
    );
    closeButton.onclick = () => {
      alert.setAttribute("style", "display: none;");
    };

    document.body.appendChild(alert);
    alert.append(title, mascot, paraDiv, closeButton);
  } else return;
};

buildAlertPopup();
