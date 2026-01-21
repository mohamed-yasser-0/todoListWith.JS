let todo = document.querySelector(".todo-container");
let input = document.querySelector("[type='text']");
let plus = document.getElementsByClassName("plus");
let taskContent = document.querySelector(".tasks-content");
let noTasksMessage = document.querySelector(".no-tasks-message");
let tasks = document.querySelector(".tasks-count span");
let completed = document.querySelector(".tasks-completed span");

let deleteAll = document.createElement("span");
deleteAll.classList.add("deleteAll");
deleteAll.textContent = "delete All";

let finisAll = document.createElement("span");
finisAll.classList.add("finishAll");
finisAll.textContent = "finish All";

// اقرأ البيانات من localStorage أو أنشئ مصفوفة جديدة
let txts = JSON.parse(localStorage.getItem("txts")) || [];

// تحميل المهام عند تشغيل الصفحة
if (txts.length > 0) {
  noTasksMessage.remove();
  txts.forEach(taskObj => {
    let task = document.createElement("span");
    task.classList.add("task-box");
    task.textContent = taskObj.text;
    if (taskObj.finished) {
      task.classList.add("finished");
    }

    let del = document.createElement("span");
    del.classList.add("delete");
    del.textContent = "delete";
    task.appendChild(del);
    taskContent.appendChild(task);
  });

  if (!todo.contains(deleteAll)) {
    todo.appendChild(deleteAll);
  }
  if (!todo.contains(finisAll)) {
    todo.appendChild(finisAll);
  }

  tasks.textContent = taskContent.children.length;
  complete();
  done();
}

// التركيز على خانة الإدخال عند تحميل الصفحة
window.onload = load;

// إضافة مهمة جديدة
plus[0].onclick = function () {
  if (input.value.trim() === "") {
    load()
  } else {
    noTasksMessage.remove();

    let task = document.createElement("span");
    task.classList.add("task-box");
    task.textContent = input.value;

    let del = document.createElement("span");
    del.classList.add("delete");
    del.textContent = "delete";
    task.appendChild(del);
    taskContent.appendChild(task);

    if (!todo.contains(deleteAll)) {
      todo.appendChild(deleteAll);
    }
    if (!todo.contains(finisAll)) {
      todo.appendChild(finisAll);
    }

    tasks.textContent = taskContent.children.length;

    // تخزين في localStorage
    txts.push({ text: input.value, finished: false });
    localStorage.setItem("txts", JSON.stringify(txts));

    input.value = "";
    load();
    complete();
    done();
  }
};

// التعامل مع الأحداث المختلفة
document.addEventListener("click", function (e) {
  // حذف مهمة واحدة
  if (e.target.classList.contains("delete")) {
    let taskText = e.target.parentElement.firstChild.textContent.trim();

    // إزالة من الواجهة
    e.target.parentElement.remove();

    // إزالة من التخزين
    txts = txts.filter(task => task.text.trim() !== taskText);
    localStorage.setItem("txts", JSON.stringify(txts));

    tasks.textContent = taskContent.children.length;
    complete();
    relod();
    done();
  }

  // إنهاء أو إعادة المهمة
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");

    let taskText = e.target.firstChild.textContent.trim();

    txts = txts.map(task => {
      if (task.text.trim() === taskText) {
        return { ...task, finished: !task.finished };
      }
      return task;
    });

    localStorage.setItem("txts", JSON.stringify(txts));
    complete();
    done();
  }

  // حذف الكل
  if (e.target.classList.contains("deleteAll")) {
    taskContent.innerHTML = "";
    localStorage.removeItem("txts");
    txts = [];
    relod();
    load();
    complete();
  }

  // إنهاء الكل أو إلغاء الكل
  if (e.target.classList.contains("finishAll")) {
    e.target.classList.toggle("click");

    if (e.target.classList.contains("click")) {
      for (let i = 0; i < taskContent.children.length; i++) {
        taskContent.children[i].classList.add("finished");
      }
      txts = txts.map(task => ({ ...task, finished: true }));
      e.target.textContent = "return All";
    } else {
      for (let i = 0; i < taskContent.children.length; i++) {
        taskContent.children[i].classList.remove("finished");
      }
      txts = txts.map(task => ({ ...task, finished: false }));
      e.target.textContent = "finish All";
    }

    localStorage.setItem("txts", JSON.stringify(txts));
    complete();
    done();
  }
});

// تحديث عدد المهام المنجزة
function complete() {
  let m = document.querySelectorAll(".finished");
  completed.textContent = m.length;
}

// عند حذف كل المهام
function relod() {
  if (taskContent.children.length === 0) {
    taskContent.appendChild(noTasksMessage);
    deleteAll.remove();
    finisAll.remove();
    tasks.textContent = 0;
  }
}

// تركيز في خانة الإدخال
function load() {
  input.focus();
}

// تحديث حالة زر "finish all" حسب الإنجاز
function done() {
  if (tasks.textContent === completed.textContent && tasks.textContent !== "0") {
    finisAll.classList.add("click");
    finisAll.textContent = "return All";
  } else {
    finisAll.classList.remove("click");
    finisAll.textContent = "finish All";
  }
}


function findMissingLetterIn(givenLetters) {
  let alpha = "abcdefghijklmnopqrstuvwxyz";
  let start = alpha.indexOf(givenLetters[0]);


// ##################################################################################################################################

  for (let i = 0; i < givenLetters.length; i++) {
    // console.log(alpha[start + i])
    // console.log(givenLetters[i])

    if (alpha[start + i] !== givenLetters[i]) {

      return alpha[start + i]

    }
  }
  return "No Missing Letter In Sequence";
}

console.log(findMissingLetterIn("defgi")); // h
console.log(findMissingLetterIn("abcdeghi")); // f
console.log(findMissingLetterIn("xyz")); // No Missing Letter In Sequence