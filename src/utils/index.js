export function readFile(file) {
  return new Promise(resolve => {
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = ev => {
      resolve(ev.target.result)
    }
  })
}
export function dealdate(dealdate) {
    const date = new Date(dealdate)
    const year = date.getFullYear()   
    let month = date.getMonth() + 1
    month = month<10?"0"+month:month   
    let day = date.getDate()
    day = day<10?"0"+day:day        
    let hour = date.getHours()     
    hour = hour<10?"0"+hour:hour          
    let minute = date.getMinutes() 
    minute = minute<10?"0"+minute:minute  
    let second = date.getSeconds()
    second = second<10?"0"+second:second 
    return year + '-' + month + '-' + day
}