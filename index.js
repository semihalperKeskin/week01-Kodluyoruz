// setTimeout'lar ile loading görüntüsü yakalandı
//bool'lar eklenerek butonları if else komutları ile açılır kapanır hale getirildi.


let loaderPage = document.querySelector(".loader")


document.querySelector("#loadPost").addEventListener("click", () => {
  
 
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json()).then(response => {
    const posts = response.slice(0, 20)
    renderPost(posts)
  })


})

// bool eklenerek if else sorguları ile button'a açılır kapanır özelliği atandı.
let loadPostBool = true; 
const renderPost = (data = []) => {
  
  if(loadPostBool){
    loaderPage.style.display="block"
  setTimeout(() => {
    loaderPage.style.display="none"
  data.forEach((item) => {
    const li = document.createElement("li")
    li.innerHTML = `<div class="card">
  <div class="card-body">
    ${item.title}
  </div>
</div>`
    document.querySelector("#ul-1").appendChild(li)
  })
  document.querySelector("#ul-1").style.display ="block"
  loadPostBool = false
},500)
}else {
  loaderPage.style.display="block"
  setTimeout(() => {
    loaderPage.style.display="none"
  document.querySelector("#ul-1").style.display ="none"
  loadPostBool = true;},500)
}
}


const loadUserButton = document.querySelector("#loadUsers")




let users = []
let loadUsersBool = true;
const loadUsers = () => {
  loaderPage.style.display="block"
  setTimeout(() => {
    loaderPage.style.display="none"
    if(loadUsersBool){
      fetch("https://jsonplaceholder.typicode.com/users").then(response => {
        return response.json()
      }).then(response => {
        users = response.map((x, index) => {
          x.orderNo = index + 1
          return x
        })
        renderUsers(users)
      }).catch(err => {
        console.error(err)
      })
      toggleTable("block")
      loadUsersBool = false;
    }
    else  {
      toggleTable("none")
      loadUsersBool = true;
    }
    
  }, 2000);
  
}

loadUserButton.addEventListener("click",loadUsers)

const userDom = document.querySelector("#user")

let user = {}
const renderUsers = (users = []) => {
  
  userDom.innerHTML = ""
  const table = document.createElement("table")

  
  table.classList.add("table")

  const thead = document.createElement("thead")
  thead.innerHTML = `
  <tr>
  <th scope="col" id="userId">Id</th>
    <th scope="col" id="userSira"><button class="buttonSira">Sıra No <i class="fa fa-sort" aria-hidden="true"></i></button></th>
    <th scope="col" id="userName">Name</th>
    <th scope="col" id="userEmail">Email</th>
    <th scope="col" id="userPhone">Phone</th>
    <th scope="col" id="userWebsite">Website</th>
    <th scope="col" id="userAction">Actions</th>
  </tr>`
  table.appendChild(thead)

  const tbody = document.createElement("tbody")

  tbody.innerHTML = users.map((user, index) => {
    return `<tr>
      <th scope="row">${user.id}</th>
      <th scope="row">${index + 1}</th>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.website}</td>
      <td>
      <button type="button" class="btn btn-danger btn-sm remove" data-id="${user.id}">Sil</button>
      <button type="button" class="btn btn-warning btn-sm update" data-id="${user.id}">Düzenle</button>
      </td>
    </tr>`
  }).join(" ")
  table.appendChild(tbody)

  userDom.appendChild(table)

  document.querySelector("#userSira").addEventListener("click", reverse)



  
  // id'ye göre reverse işlemi
  let reverseBool = true;
  function reverse() {
    loaderPage.style.display="block"
  setTimeout(() => {
    loaderPage.style.display="none"
    if(reverseBool){
    tbody.innerHTML = users.map((user, index) => {
      return `<tr>
        <th scope="row">${user.id}</th>
        <th scope="row" id="siraNoindex">${index + 1}</th>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.website}</td>
        <td>
        <button type="button" class="btn btn-danger btn-sm remove" data-id="${user.id}">Sil</button>
        <button type="button" class="btn btn-warning btn-sm update" data-id="${user.id}">Düzenle</button>
        </td>
      </tr>`
    }).reverse().join(" ")
    reverseBool =false;
  }else {
    tbody.innerHTML = users.map((user, index) => {
      return `<tr>
        <th scope="row">${user.id}</th>
        <th scope="row">${index + 1}</th>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.website}</td>
        <td>
        <button type="button" class="btn btn-danger btn-sm remove" data-id="${user.id}">Sil</button>
        <button type="button" class="btn btn-warning btn-sm update" data-id="${user.id}">Düzenle</button>
        </td>
      </tr>`
    }).join(" ")
    reverseBool =true;

  }
    table.appendChild(tbody)
  
    userDom.appendChild(table) },2000)
  }

  // Tablo kayıt silme işlemi
  document.querySelectorAll(".remove").forEach(button => {
    
    button.addEventListener("click", function () {
      const status = confirm("Kaydı silmek üzeresiniz emin misiniz?")
      if (status) {
        loaderPage.style.display="block"
        setTimeout(() => {
        loaderPage.style.display="none"
        const id = this.getAttribute("data-id")
        renderUsers(users.filter(x => x.id != id))
        },500)
      }
    })
  })

  // düzenleme buttonu işlemi
  document.querySelectorAll(".update").forEach(button => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id")
      const _user = users.find(user => user.id == id)
      fillUser(_user)
      toggleUser()
      toggleTable("none")
    })
  })
}

// Tablo display
const toggleTable = (display = "none") => {
  document.querySelector("#user").style.display = display
}

// kullanıcı formu display
const toggleUser = (display = "block") => {
  document.querySelector("#user-form").style.display = display
}


// tablo value larını eşitleme
const fillUser = (user) => {
  document.querySelector("#labelName").value = user.name
  document.querySelector("#labelPhone").value = user.phone
  document.querySelector("#labelWebSite").value = user.website
  document.querySelector("#labelEmail").value = user.email
  document.querySelector("#userId").value = user.id
}


// form value larını tablo ile fixleme
const updateUser = () => {
  loaderPage.style.display="block"
  setTimeout(() => {
    loaderPage.style.display="none"
  
  
  try {
     // olmayan bir dom elemanını seçmeye çalışıp hataya düşürdük
    // const age = document.querySelector("#labelAge").value
    const name = document.querySelector("#labelName").value
    const phone = document.querySelector("#labelPhone").value
    const webSite = document.querySelector("#labelWebSite").value
    const email = document.querySelector("#labelEmail").value
    const userId = document.querySelector("#userId").value

    const index = users.findIndex(user => user.id == userId)
    fetch("http://localhost:3000/update", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Token": window.localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        const { status } = response
        if (status == true) {
          users[index] = { name, phone, website: webSite, email, id: userId }
          renderUsers(users)
          toggleTable("block");
          toggleUser("none");
          alert("Güncelleme işlemi başarıyla gerçekleşti")
        } else {
          alert("Güncelleme işlemi sırasında bir hata oluştu")
        }
    })
   
  } catch (error) {
    console.error(error)
    alert("Bizden kaynaklı bir hata oluştu özür dileriz")
    toggleTable("block");
    toggleUser("none");
  }
},2000)
}
// form vazgeç butonu
document.querySelector("#cancel").addEventListener("click", () => {

  loaderPage.style.display="block"
  setTimeout(() => {
    loaderPage.style.display="none"
  toggleTable("block")
  toggleUser("none");},500)
})

// form kaydet işlemi
document.querySelector("#save").addEventListener("click",updateUser)


