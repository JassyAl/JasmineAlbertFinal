// 1. createElemWithText function
function createElemWithText(
    HTMLelement = "p",
    textContent = "",
    optionalClassname
  ) {
    let optionCreated = document.createElement(HTMLelement);
    optionCreated.textContent = textContent;
    if (optionalClassname) {
      optionCreated.className = optionalClassname;
    }
    return optionCreated;
  }
  
  // 2. createSelectOptions
  function createSelectOptions(users) {
    if (users === undefined || users === null) {
      return undefined;
    }
    optArray = [];
    for (user of users) {
      const options = document.createElement("option");
      options.value = user.id;
      options.innerHTML = user.name;
      optArray.push(options);
    }
    return optArray;
  }
  
  // 3. toggleCommentSection
  function toggleCommentSection(postId) {
    if (postId === undefined || postId === null) {
      return undefined;
    }
    let section = document.querySelector(`section[data-post-id="${postId}"]`);
    if (section) {
      section.classList.toggle("hide");
    }
    return section;
  }
  
  // 4. toggleCommentButton
  function toggleCommentButton(postID) {
    if (!postID) {
      return;
    }
    const selectedButton = document.querySelector(
      `button[data-post-id = "${postID}"`
    );
    if (selectedButton != null) {
      selectedButton.textContent === "Show Comments"
        ? (selectedButton.textContent = "Hide Comments")
        : (selectedButton.textContent = "Show Comments");
    }
    return selectedButton;
  }
  
  // 5. deleteChildElements
  function deleteChildElements(parentElement) {
    if (!parentElement || !parentElement.nodeType) {
      return undefined;
    }
    let child = parentElement.lastElementChild;
    while (child) {
      parentElement.removeChild(child);
      child = parentElement.lastElementChild;
    }
    return parentElement;
  }
  
  // 6. addButtonListeners
  function addButtonListeners() {
    let myElem = document.querySelector("main");
    let buttons = myElem.querySelectorAll("button");
    if (buttons) {
      for (let i = 0; i < buttons.length; i++) {
        let myButton = buttons[i];
        let postId = myButton.dataset.postId;
        myButton.addEventListener("click", function (event) {
          toggleComments(event, postId), false;
        });
      }
      return buttons;
    }
  }
  
  // 7. removeButtonListeners
  function removeButtonListeners() {
    let myElem = document.querySelector("main");
    let buttons = myElem.querySelectorAll("button");
    console.log(buttons);
    if (buttons) {
      for (let i = 0; i < buttons.length; i++) {
        let myButton = buttons[i];
        postId = myButton.dataset.postId;
        myButton.removeEventListener("click", function (event) {
          toggleComments(event, postId), false;
        });
      }
      return buttons;
    }
  }
  
  // 8. createComments
  function createComments(comments) {
    if (!comments) {
      return undefined;
    }
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      let a = document.createElement("article");
      let h3 = createElemWithText("h3", comment.name);
      let p1 = createElemWithText("p", comment.body);
      let p2 = createElemWithText("p", `From: ${comment.email}`);
      a.appendChild(h3);
      a.appendChild(p1);
      a.appendChild(p2);
      fragment.appendChild(a);
    }
    return fragment;
  }
  
  // 9. populateSelectMenu
  function populateSelectMenu(users) {
    if (!users) return;
    let menu = document.querySelector("#selectMenu");
    let options = createSelectOptions(users);
    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      menu.append(option);
    }
    return menu;
  }
  
  // 10. getUsers
  async function getUsers() {
    const users = await fetch("https://jsonplaceholder.typicode.com/users");
    return await users.json();
  }
  
  // 11. getUserPosts
  async function getUserPosts(userId) {
    if (!userId) return;
    const posts = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );
    return await posts.json();
  }
  
  // 12. getUser
  async function getUser(userId) {
    if (!userId) return;
    const user = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    return await user.json();
  }
  
  // 13. getPostComments
  async function getPostComments(postId) {
    if (!postId) return;
    const postComments = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return await postComments.json();
  }
  
  // 14. displayComments
  async function displayComments(postId) {
    if (!postId) return;
    let section = document.createElement("section");
    section.dataset.postId = postId;
    section.classList.add("comments", "hide");
    const comments = await getPostComments(postId);
    const fragment = createComments(comments);
    section.append(fragment);
    console.log(section);
    return section;
  }
  console.log(displayComments(5));
  
  // 15. createPosts
  async function createPosts(jsonPosts) {
    if (!jsonPosts) return;
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < jsonPosts.length; i++) {
      let post = jsonPosts[i];
      let article = document.createElement("article");
      let section = await displayComments(post.id);
      let author = await getUser(post.userId);
      let h2 = createElemWithText("h2", post.title);
      let p = createElemWithText("p", post.body);
      let p2 = createElemWithText("p", `Post ID: ${post.id}`);
      let p3 = createElemWithText(
        "p",
        `Author: ${author.name} with ${author.company.name}`
      );
      let p4 = createElemWithText("p", `${author.company.catchPhrase}`);
      let button = createElemWithText("button", "Show Comments");
      button.dataset.postId = post.id;
      article.append(h2, p, p2, p3, p4, button, section);
      fragment.append(article);
    }
    console.log(fragment);
    return fragment;
  }
  
  // 16. displayPosts
  async function displayPosts(posts) {
    let myMain = document.querySelector("main");
    let element = posts
      ? await createPosts(posts)
      : document.querySelector("main p");
    myMain.append(element);
    return element;
  }
  
  // 17. toggleComments
  function toggleComments(event, postId) {
    if (!event || !postId) {
      return undefined;
    }
    event.target.listener = true;
    let section = toggleCommentSection(postId);
    let button = toggleCommentButton(postId);
    return [section, button];
  }
  
  // 18. refreshPosts
  async function refreshPosts(posts) {
    if (!posts) {
      return undefined;
    }
    let buttons = removeButtonListeners();
    let myMain = deleteChildElements(document.querySelector("main"));
    let fragmentment = await displayPosts(posts);
    let button = addButtonListeners();
    return [buttons, myMain, fragmentment, button];
  }
  
  // 19. selectMenuChangeEventHandler
  async function selectMenuChangeEventHandler(e) {
    if (!e) return undefined;
    let userId = e?.target?.value || 1;
    let posts = await getUserPosts(userId);
    let refreshPostsArray = await refreshPosts(posts);
    return [userId, posts, refreshPostsArray];
  }
  
  // 20. initPage
  async function initPage() {
    let users = await getUsers();
    let select = populateSelectMenu(users);
    return [users, select];
  }
  
  // 21. initApp
  function initApp() {
    initPage();
    let select = document.getElementById("selectMenu");
    select.addEventListener("change", selectMenuChangeEventHandler, false);
  }
  document.addEventListener("DOMContentLoaded", initApp, false);
  