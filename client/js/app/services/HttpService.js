//criamos um serviço para facilitar o processo de fazer um get no XMLHttpRequest
class HttpService {
    
    //ele recebe a url em q será feito o get
    get(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
      
            xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  resolve(JSON.parse(xhr.responseText))
                } else {
                  reject(xhr.responseText)
                }
              }
            };
      
            xhr.send();
          });
    }
}