export const emailCheck = (email) =>{
    //aa_aa@aa.com 이메일 정규식
    let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([A-Za-z])*/;
    return _reg.test(email);
}