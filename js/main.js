const header = document.getElementById('header');
const footer = document.getElementById('footer');
const qna = document.getElementById('qna');
const u_name = document.querySelector('input[type=text]');
const wrap = document.getElementById('wrap');
const tabletMQL = window.matchMedia("all and (min-width: 768px)");
const pcMQL = window.matchMedia("all and (min-width: 1024px)");
const ENDPOINT = 8.3;
const select = [];
let qIdx = -1;

const goTo = (dest) => {
    let elem;
    let elemTop;
    if (dest === 'artist') {
        elem = document.getElementById('intro-box');
    } else {
        elem = document.getElementById('share-box');
    }
    elemTop = window.pageYOffset + elem.getBoundingClientRect().top;
    if (pcMQL.matches) {
        elemTop -= 150;
    } else if (tabletMQL.matches) {
        elemTop -= 115;
    } else {
        elemTop -= 60;
    }
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: elemTop
    });
}
const goArtist = () => goTo('artist');
const goShare = () => goTo('share');

const copy = () => {
    const tmp = document.createElement('textarea');
    document.body.appendChild(tmp);
    tmp.value = url;
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
}

const e_calcScore = () => {
    let e_point = 0;
    for (let i = 9; i < 12; i++) {
        e_point += qnaList[i].a[select[i]].energy_score;
    }
    console.log(e_point)
    return e_point;
}

const p_calcScore = () => {
    let p_point = 0;
    for (let i = 0; i < 3; i++) {
        p_point += qnaList[i].a[select[i]].perception_score;
    }
    console.log(p_point)
    return p_point;
}

const d_calcScore = () => {
    let d_point = 0;
    for (let i = 6; i < 9; i++) {
        d_point += qnaList[i].a[select[i]].decision_score;
    }
    console.log(d_point)
    return d_point;
}

const pat_calcScore = () => {
    let pat_point = 0;
    for (let i = 3; i < 6; i++) {
        pat_point += qnaList[i].a[select[i]].pattern_score;
    }
    console.log(pat_point)
    return pat_point;
}

const sortResult = (e_point,p_point,d_point,pat_point) => {
    let num = 0;
    if (e_point < 1.5 && p_point < 1.5 && d_point <1.5 && pat_point < 1.5) {
        num = 0; // INFP
    } else if (e_point >= 1.5 && p_point < 1.5 && d_point <1.5 && pat_point < 1.5) {
        num = 1; // ENFP
    } else if (e_point < 1.5 && p_point >= 1.5 && d_point < 1.5 && pat_point < 1.5) {
        num = 2; // ISFP
    } else if (e_point < 1.5 && p_point < 1.5 && d_point >= 1.5 && pat_point < 1.5) {
        num = 3; // INTP
    } else if (e_point < 1.5 && p_point < 1.5 && d_point <1.5 && pat_point >= 1.5) {
        num = 4; // INFJ
    } else if (e_point >= 1.5 && p_point >= 1.5 && d_point <1.5 && pat_point < 1.5) {
        num = 5; // ESFP
    } else if (e_point >= 1.5 && p_point < 1.5 && d_point >=1.5 && pat_point < 1.5) {
        num = 6; // ENTP
    } else if (e_point >= 1.5 && p_point < 1.5 && d_point <1.5 && pat_point >= 1.5) {
        num = 7; // ENFj
    } else if (e_point < 1.5 && p_point >= 1.5 && d_point >= 1.5 && pat_point < 1.5) {
        num = 8; // ISTP
    } else if (e_point < 1.5 && p_point >= 1.5 && d_point <1.5 && pat_point >= 1.5) {
        num = 9; // ISFJ
    } else if (e_point < 1.5 && p_point < 1.5 && d_point >=1.5 && pat_point >= 1.5) {
        num = 10; // INTJ
    } else if (e_point >= 1.5 && p_point >= 1.5 && d_point >= 1.5 && pat_point < 1.5) {
        num = 11; // ESTP
    }else if (e_point >= 1.5 && p_point >= 1.5 && d_point <1.5 && pat_point >= 1.5) {
        num = 12; // ESFJ
    }else if (e_point >= 1.5 && p_point < 1.5 && d_point >= 1.5 && pat_point >= 1.5) {
        num = 13; // ENTJ
    }else if (e_point < 1.5 && p_point >= 1.5 && d_point >= 1.5 && pat_point >= 1.5) {
        num = 14; // ISTJ
    }else if(e_point >= 1.5 && p_point >= 1.5 && d_point >= 1.5 && pat_point >= 1.5){
        num = 15; // ESTJ
    }
    console.log(num)
    return num;
}
// 변경 시작
const matchResult = (grade) => {
    let num = 0;
    if (grade == 0) {
        num = 7;
    } else if(grade == 1){
        num = 10;
    }else if(grade == 2){
        num = 12;
    }else if(grade == 3){
        num = 13;
    }else if(grade == 4){
        num = 6;
    }else if(grade == 5){
        num = 14;
    }else if(grade == 6){
        num = 4;
    }else if(grade == 7){
        num = 0;
    }else if(grade == 8){
        num = 15;
    }else if(grade == 9){
        num = 11;
    }else if(grade == 10){
        num = 1;
    }else if(grade == 11){
        num = 9;
    }else if(grade == 12){
        num = 2;
    }else if(grade == 13){
        num = 3;
    }else if(grade == 14){
        num = 5;
    }else if(grade == 15){
        num = 8;
    }
    console.log(num)
    return num;
}
const unmatchResult = (grade) => {
    let num = 0;
    if (grade == 0) {
        num = 2;
    } else if(grade == 1){
        num = 15;
    }else if(grade == 2){
        num = 0;
    }else if(grade == 3){
        num = 9;
    }else if(grade == 4){
        num = 14;
    }else if(grade == 5){
        num = 5;
    }else if(grade == 6){
        num = 8;
    }else if(grade == 7){
        num = 12;
    }else if(grade == 8){
        num = 6;
    }else if(grade == 9){
        num = 3;
    }else if(grade == 10){
        num = 12;
    }else if(grade == 11){
        num = 13;
    }else if(grade == 12){
        num = 7;
    }else if(grade == 13){
        num = 11;
    }else if(grade == 14){
        num = 4;
    }else if(grade == 15){
        num = 1;
    }
    console.log(num)
    return num;
}
// 변경 종
const goResult = () => {
    if (pcMQL.matches) {
        console.log('PC');
        wrap.style.marginTop = '10px';
    } else if (tabletMQL.matches) {
        console.log('tablet');
        wrap.style.marginTop = '10px';
    }

    const result = document.getElementById('result');
    const e_point = e_calcScore();
    const p_point = p_calcScore();
    const d_point = d_calcScore();
    const pat_point = pat_calcScore();
    const grade = sortResult(e_point,p_point,d_point,pat_point);
    //추가된 const
    const match_grade = matchResult(grade)
    const unmatch_grade = unmatchResult(grade)
    //추가된 const(종료)
    const pTitle = document.querySelector('.p');
    // const res_point = document.querySelector('.point');
    const pin = document.querySelector('.pin');
    const img_url = 'img/image-' + grade + '.jpg';
    const res_img = document.createElement('img');
    const res_img_div = document.querySelector('.art');
    //추가된 const
    const match_img_url = 'img/image-' + match_grade + '.jpg';
    const match_img = document.createElement('img');
    const match_div = document.querySelector('.match-img');
    const unmatch_img_url = 'img/image-' + unmatch_grade + '.jpg';
    const unmatch_img = document.createElement('img');
    const unmatch_div = document.querySelector('.unmatch-img');
    //추가된 const(종료)
    const animal = document.querySelector('.text2');
    const desc = document.querySelector('.res_title');
    const li1=document.querySelector('.li1');
    const li2=document.querySelector('.li2');
    const li3=document.querySelector('.li3');
    const li4=document.querySelector('.li4');

    // res_point.innerHTML = infoList[grade].stitle;
    res_img.src = img_url;
    res_img.alt = infoList[grade].name;
    res_img.title = infoList[grade].name;
    res_img_div.appendChild(res_img);
    animal.innerHTML = infoList[grade].name;
    desc.innerHTML = infoList[grade].desc;
    li1.innerHTML = infoList[grade].li_1;
    li2.innerHTML = infoList[grade].li_2;
    li3.innerHTML = infoList[grade].li_3;
    li4.innerHTML = infoList[grade].li_4;

    //추가된 matched, unmatched 이미지, 설명값
    match_img.src = match_img_url;
    match_img.alt = matchList[match_grade].name;
    match_img.title = matchList[match_grade].name;
    match_div.appendChild(match_img);

    //
    unmatch_img.src = unmatch_img_url;
    unmatch_img.alt = unmatchList[unmatch_grade].name;
    unmatch_img.title = unmatchList[unmatch_grade].name;
    unmatch_div.appendChild(unmatch_img);

    //추가된 matched, unmatched 이미지, 설명값
    result.style.display='block';
    console.log('res expe');

    footer.style.display = 'block';
    result.style.display = 'block';

    footer.style.animation =
        'fade-in 0.3s forwards';
    result.style.animation =
        'going-up 0.5s, ' +
        'fade-in 0.5s forwards';

}

const end = () => {
    qna.style.animation = '';
    const interval = setInterval(() => {
        qna.style.opacity -= 0.1;
        qna.style.transform = 'translateY(-1px)';
    }, 50);
    setTimeout(() => clearTimeout(interval), 500);
    setTimeout(() => qna.style.display = 'none', 500);
    setTimeout(() => {
        const calc = document.getElementById('calc');
        calc.style.display = 'block';
        calc.style.animation =
            'going-up 0.5s forwards, ' +
            'fade-in 0.5s forwards';
    }, 700);
    setTimeout(() => {
        const calc = document.getElementById('calc');
        calc.style.animation = '';
        calc.style.animation =
            'going-left 0.4s forwards, ' +
            'fade-out 0.4s forwards';
        setTimeout(() => {
            calc.style.display = 'none';
            goResult();
        }, 400);
    }, 9000);
}

const addAnswer = (answerTxt, idx) => {
    const answer = document.createElement('button');
    const a = document.querySelector('.answer');
    answer.className += 'a_box';
    answer.innerHTML = answerTxt;
    answer.addEventListener('click', () => {
        const parent = answer.parentNode;
        const children = parent.childNodes;
        for (let i in children) {
            children[i].disabled = true;
        }
        parent.classList.add('fade-out-5-4');
        setTimeout(() => {
            select[qIdx] = idx;
            a.innerHTML = '';
            parent.classList.remove('fade-out-5-4');
            goNext();
        }, 800);
    });

    answer.style.animation =
        'going-down 0.25s forwards, fade-in 0.25s forwards'
    a.appendChild(answer);
}


const goNext = () => {
    if (qIdx++ === qnaList.length - 1) {
        end();
        return;
    }

    const status = document.querySelector('.status');
    const qNum = qnaList[qIdx];
    const q = document.querySelector('.q_box');

    status.style.width = (ENDPOINT * (qIdx + 1)) + '%';
    q.innerHTML = qNum.q;
    qna.style.animation =
        'fade-in 0.2s ease-in-out 0.3s forwards, ' +
        'going-down 0.2s ease-in-out 0.3s forwards';

    setTimeout(() => {
        const endIdx = qNum.a.length - 1;
        for (let i in qNum.a) {
            addAnswer(qNum.a[i].answer, i);
        }
        qna.style.opacity = 1;
    }, 700);
}

const begin = () => {
    const welcome = document.getElementById('welcome');

    footer.style.animation =
        'going-down 0.4s forwards, ' +
        'fade-out 0.4s forwards';
    setTimeout(() => welcome.style.animation =
        'going-up 0.4s ease-in-out forwards, ' +
        'fade-out 0.4s ease-in-out forwards', 500);
    setTimeout(() => {
        footer.style.display = 'none';
        welcome.style.display = 'none';
        qna.style.display = 'block';
        if (pcMQL.matches) {
            console.log('PC');
            wrap.style.marginTop = '10px';
        } else if (tabletMQL.matches) {
            console.log('tablet');
            wrap.style.marginTop = '10px';
        }
        goNext();
    }, 1000);
}

const load = () => {
    const start_btn = document.querySelector('.start');

    start_btn.addEventListener('click', () => {
        start_btn.disabled = true;
        begin();
    });

}

window.onload = load();

document.querySelector(".btn").addEventListener("click", function(){
    var tempElem = document.createElement('textarea');
    tempElem.value = 'https://jun-k0.github.io/movie_test/';  
    document.body.appendChild(tempElem);
  
    tempElem.select();
    document.execCommand("copy");
    document.body.removeChild(tempElem);
    alert("공유 링크가 복사되었습니다!")
  });
