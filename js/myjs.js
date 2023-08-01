const taskContainer = document.querySelector(".task__container");
const globalStore = []; //Array of objects
console.log(taskContainer);

const generateNewCard = (taskData) => 

    `
    <div class="col-sm-12 col-md-6 col-lg-4 mt-3 mb-3" id=${taskData.id}>
                <div class="card">
                    <div class="card-header d-flex justify-content-end gap-1">
                        <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
                        <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    <div class="card-body">
                        <img src= ${taskData.imageUrl}
                            class="card-img-top" alt="...">
                        <h5 class="card-title mt-3 fw-bold text-primary">${taskData.taskTitle}</h5>
                        <p class="card-text">${taskData.taskDescription}</p>
                        <a href="#" class="btn btn-primary">${taskData.taskType}</a>
                    </div>
                </div>
            </div>
    `

 
const loadInitialCardData = () => {
    //1. get card data from localstorage
    const getCardData = localStorage.getItem("bootstrap");
    //2. convert to normal object
    const {cards} = JSON.parse(getCardData); //parse is reverse method of stringify, used to convert from array of objects to normal object
    //{cards} ==> is used for destructuring, it is a object of object

    //3. loop over array of task object to create html card, and inject it into DOM
    cards.map((cardObject) =>{
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
        //4. update globalStore
        globalStore.push(cardObject);
    })

    
}


const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, //$  is used for dynamic values, Backticks are used so that abrupt results should not hamper our code
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value
    }


    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

    globalStore.push(taskData);
    localStorage.setItem("bootstrap", JSON.stringify({cards: globalStore}));//JSON.stringify is used to convert from object to array
    //bootstrap is a unique id
};
