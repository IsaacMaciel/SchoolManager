
const currentPage = location.pathname;
const menuItens = document.querySelectorAll("header .menu a");
console.log(currentPage);
    for (item of menuItens) {
        if (currentPage.includes(item.getAttribute("href"))) 
        item.classList.add('active');

        
    

    }


//Paginação [16+2]
function paginate (selectedPage,totalPages) {
    let 
        pages = [],
        oldpage //currentpage= 10

    for(let currentPage = 1; currentPage <= totalPages;currentPage++){
        
        const firstAndLastPage = currentPage == 1 || currentPage == 2  || currentPage == totalPages || currentPage == totalPages - 1;
        const pageBeforeSelectedPage = currentPage <= selectedPage +2;
        const pageAfterSelectedPage = currentPage >= selectedPage -2;

        if(firstAndLastPage || pageBeforeSelectedPage && pageAfterSelectedPage) {
        if (oldpage && currentPage - oldpage > 2) {
            pages.push('...');
        }

        if (oldpage && currentPage - oldpage == 2) {
            pages.push(oldpage + 1);
        }
        pages.push(currentPage);

        oldpage=currentPage;


      
        }
    }
    return pages;
}
const pagination = document.querySelector(".pagination");


    const page = +pagination.dataset.page;
    const total = +pagination.dataset.total;
    const filter = pagination.dataset.filter;
    const pages = paginate(page,total);
    let elements = "";

    for (let page of pages) {
        if (String(page).includes("...")) {
            elements += `<span>${page}</span>`;
        } else {
            if (filter){
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`;
            } else {
                elements += `<a href="?page=${page}">${page}</a>`;
            }
            
        }
        
    }
        pagination.innerHTML = elements;



