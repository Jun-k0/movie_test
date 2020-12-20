/*
    a에 대답할 수록 각각 I(내향), N(직관), F(감정), P(인식)에 가까운 것으로 판단
    b에 대답할 수로 각각 E(외향), S(현실), T(사고), J(판단)에 가까운 것으로 판단
    I / E = 세상과 타인 / 내면 세계
    N / S = 실제적인 인식 / 실제 너머로 인식
    F / T = 사실과 진실 위주 / 관계와 사람 위주
    P / J = 계획적인 생활 / 즉흥적인 생활
 */


const qnaList = [
    {
        q: '나의 최애 영화를 설명할 때',
        q2: '나는',
        a: [
            { answer: '구체적인 상황 하나하나 설명', perception_score: 0 },
            { answer: '대략 느낌과 분위기를 설명', perception_score: 1 }
            ]
    },
    {
        q: '크리스마스에 연인(친구)를',
        q2: '기다릴 때 나는',
        a: [
            { answer: '오늘 어떻게 놀지 일정을 생각', perception_score: 0 }, // 0 i, e energy_score
            { answer: '오와 저거 신기하다~ (의식의 흐름~)', perception_score: 1 }
            ]
    },
    {
        q: '영화에 나오는 일들에 대해',
        q2: '나는',
        a: [
            { answer: '영화는 영화일 뿐...', perception_score: 0 },
            { answer: '저런 일도 있을 수도 있지~!', perception_score: 1 }
            ]
    },
    {
        q: '영화를 예매할 때 나는',
        q2: '',
        a: [
            { answer: '그날따라 땡기는 영화', pattern_score: 0 }, // n,s 0 perception_score
            { answer: '미리미리 계획대로', pattern_score: 1 }
            ]
    },
    {
        q: '크리스마스에 예약한 식당이',
        q2: '문을 닫았을 때 나는',
        a: [
            { answer: '잠만 기다려봐. 금방 찾아볼게', pattern_score: 0 },
            { answer: '옆에 괜찮은 식당있던데? 거기로 가자', pattern_score: 1 }
        ]
    },
    {
        q: '이번 주는 크리스마스인데',
        q2: '나는',
        a: [
            { answer: '전날 미리 어떻게 나갈 지 준비한다.', pattern_score: 0 },
            { answer: '아침에 끌리는 옷 입고 나간다.', pattern_score: 1 }
        ]
    },
    {
        q: '영화를 보다가 오징어다리가',
        q2: '하나 남았을 때 나는',
        a: [
            { answer: '그냥 너 먹어ㅎㅎ', decision_score: 0 }, // t,f 0 decision_score
            { answer: '안내면 진 거 가위바위보!!!', decision_score: 1 }
        ]
    },
    {
        q: '영화 속 주인공이 된 나는',
        q2: '',
        a: [
            { answer: '따뜻한 감성의 주인공', decision_score: 0 },
            { answer: '유능하고 냉철한 주인공', decision_score: 1 }
        ]
    },
    {
        q: '친구가 "꿀꿀해서 영화 한 편',
        q2: '보고 왔어"라 할 때 나는',
        a: [
            { answer: '"기분이 왜 꿀꿀해ㅠㅠ"', decision_score: 0 },
            { answer: '"오 어떤 영화 봤어??"', decision_score: 1 }
        ]
    },
    {
        q: '영화관에서 영화보기,',
        q2: '집콕 영화보기 중 나는',
        a: [
            { answer: '나는 집이 편해ㅎ', energy_score: 0 }, // j,p 0 pattern_score
            { answer: '영화는 역시 영화관이지', energy_score: 1 }
        ]
    },
    {
        q: '영화관에서 영화를 보던 중',
        q2: '오줌이 마려운 나는',
        a: [
            { answer: '참고 참다 영화가 끝난 후 화장실로', energy_score: 0 },
            { answer: '안참고 바로 화장실로', energy_score: 1 }
        ]
    },
    {
        q: '나는 크리스마스를',
        q2: '',
        a: [
            { answer: '혼자 보낸다', energy_score: 0 },
            { answer: '연인과 함께 보낸다', energy_score: 1 }
        ]
    }
]

const infoList = [
    {
        from: 0,
        to: 1,
        mLeft: '10%',
        stitle: '"지금까지 이런 맛은 없었다"',
        name: '극한직업',
        desc: '누구보다 건강하고 밝은 사회를 원하는데,',
        desc2: '바보처럼 착한 우리 형사님들 같네?',
        li_1:'성실하고 이해심이 많은 타입!',
        li_2:'나만의 신념은 확실하자너~',
        li_3:'올 연말 아무 걱정없이 ’가족들과‘ 웃으면서 보내자~',
        li_4:'4%의 사람들이 당신과 같은 영화를 좋아한대요!',
        subt:'“지금까지 이런 맛은 없었다.”'
    },
    {
        from: 1,
        to: 2,
        mLeft: '25%',
        stitle: '"3000만큼 사랑해"',
        name: '어벤져스',
        desc: '당신을 보면 어벤져스 멤버들 같다니깐?',
        desc2: '시끌벅적 평범하지가 않아~',
        li_1:'일상생활은 지루하지?',
        li_2:'항상 자유롭고 싶지?',
        li_3:'그런데도 열정 넘치는 당신은 어벤져스 멤버!',
        li_4:'7%의 사람들이 당신과 같은 영화를 좋아한대요!',
        subt:'“3000만큼 사랑해”'
    },
    {
        from: 2,
        to: 3,
        mLeft: '40%',
        stitle: '"city of stars"',
        name: '라라랜드',
        desc: '꿈을 이루고 싶은 이들의 러브스토리!',
        desc2: '마치 나와 같은 사람들의 이야기?',
        li_1:'항상 새로이 시도하고 도전적인 당신!',
        li_2:'마치 예술가 같은 타입의 당신',
        li_3:'여유롭진 않지만 그들의 이야기도 한 번 들어봐.',
        li_4:'9%의 사람들이 당신과 같은 영화를 좋아한대요!',
        subt:'“City of Stars~”'
    },
    {
        from: 3,
        to: 4,
        mLeft: '55%',
        stitle: '"Stay!!!"',
        name: '인터스텔라',
        desc: '오늘도 혼자 새로운 지식을 갈구하시나요?',
        desc2: '‘23년 4개월 8일’째에요..',
        li_1:'지적인 당신, 오늘도 지식에 목이 마르죠?',
        li_2:'괜히 나가기보단 집에서 우주의 신비를..',
        li_3:'올해는 하던대로 Stay. 나가면 안되니까!',
        li_4:'3%의 사람들이 당신과 같은 영화를 좋아한대요!',
        subt:'“STAY!!!”'
    },
    {
        from: 4,
        to: 5,
        mLeft: '70%',
        name: '세렌디피티',
        stitle: '"그는 열정적이었는가?"',
        desc: '누구보다 운명을 믿지 않으세요?',
        desc2: '그만큼 당신은 신비로운 사람이잖아요.',
        li_1:'크리스마스의 눈 내리는 뉴욕 거리를 느껴봐야 하는데...',
        li_2:'그곳에 나의 운명적인 사랑까지.. 분명 있을거야!',
        li_3:'하지만 올해는 안 돼. 진짜진짜진짜 다들 조심하자!',
        li_4:'1% 미만의 사람들이 당신과 같은 영화를 좋아한대요!',
        subt:'“만날 운명이라면 만나게 돼요”'
    },
    {
        from: 5,
        to: 6,
        mLeft: '85%',
        stitle: '"황금티켓을 찾았어요!"',
        name: '찰리와 초콜릿 공장',
        desc: '정신없지만 몽환적인 찰리의 초콜릿 공장이',
        desc2: '당신의 에너지와 어울릴 걸?',
        li_1:'누구보다 자유롭고 즉흥적인 당신!',
        li_2:'호기심도 많고 개방적이야!',
        li_3:'찰리와 함께 새로운 곳도 즐겨봐!',
        li_4:'8%의 사람들이 당신과 같은 영화를 좋아한대요!',
        subt:'“사는 것이 초콜릿보다 더 달콤하다는 것”'
    },
    {
        from: 6,
        to: 7,
        mLeft: '85%',
        stitle: '"윙가르디움 레비오-우사"',
        name: '해리포터와 마법사의 돌',
        desc: '신비하고 웅장한 분위기의 호그와트!',
        desc2: '당신은 용기있는 그리핀도르 학생?!',
        li_1:'똑똑하고 독창적인데 도전적인 당신!',
        li_2:'그런데 당신 똑똑한 안경잡이 스타일이야?',
        li_3:'솔직한 당신. 외쳐 “입닥쳐 말포이”',
        li_4:'3%의 사람들이 당신과 같은 영화를 좋아한대요!',
        subt:'“윙가르디움 레비오-우사”'
    },
    {
        from: 7,
        to: 8,
        mLeft: '85%',
        stitle: '"24601"',
        name: '레미제라블',
        desc: '이런 웅장한 영화 맘에 들지 않아요?',
        desc2: '마치 당신같잖아!',
        li_1:'카리스마가 넘쳐흐르는 당신!',
        li_2:'마치 사회운동가와 같은 당신!',
        li_3:'영화 분위기도, 시대상도 당신하고 어울리는데?',
        li_4:'2%의 사람들이 당신과 같은 영화를 좋아한대요!',
        subt:'“24601”'
    },
    {
        from: 8,
        to: 9,
        mLeft: '85%',
        stitle: '"케빈!!!"',
        name: '나홀로 집에',
        desc: '어찌저찌 잘 헤쳐나가는 케빈같은 당신!',
        desc2: '근데 올해 왜 이걸 보고 있죠?',
        li_1:'뭐든 적응력이 빠른 당신!',
        li_2:'그런데 조용하니 내 할 일 하는게 좋아.',
        li_3:'그래서 나는 올해도.. 이거나 봐야지.',
        li_4:'5%의 사람들이 당신과 같은 영화를 좋아한대요!',
        subt:'“케빈!!!!!”'
    },
    {
        from: 9,
        to: 10,
        mLeft: '85%',
        stitle: '"1978년부터 한가하다우"',
        name: '로멘틱 홀리데이',
        desc: '공감 능력이 뛰어난 당신!',
        desc2: '다양한 감정을 느낄 수 있을 거에요',
        li_1:'차분하고 헌신적인 당신!',
        li_2:'공감을 잘해서 눈물도 많아.',
        li_3:'크리스마스의 러브스토리, 누구보다 공감할 걸?',
        li_4:'13%의 사람들이 당신과 같은 영화를 좋아한대요!',
        subt:'“1978년부터 한가하다우..”'
    },
    {
        from: 10,
        to: 11,
        mLeft: '85%',
        stitle: '"얼 유 냄궁민수?"',
        name: '설국열차',
        desc: '문을 열고 세상 밖으로 나갈 수 있는 당신!',
        desc2: '이번 크리스마스에는 좀만 참아!',
        li_1:'꽤나 용의주도한 타입이군요?',
        li_2:'계획을 향해서 돌진하는 당신!',
        li_3:'강한 의지로 꼬리칸에서 머리칸까지!',
        li_4:'2%의 사람들이 당신과 같은 영화를 좋아한대요!',
        subt:'“얼 유 냄궁민수?”'
    },
    {
        from: 11,
        to: 12,
        mLeft: '85%',
        stitle: '"묶을만한게 있죠"',
        name: '그레이의 50가지 그림자',
        desc: '어흐...♥',
        desc2: '좋냐?',
        li_1:'벼랑 끝 쾌락을 즐길 줄 아는 자!',
        li_2:'근데 심지어 똑똑해!',
        li_3:'즐거운 크리스마스 보내!',
        li_4:'4%의 사람들이 당신과 같은 영화를 좋아한대요!',
        subt:'“묶을만한게 있죠”'
    },
    {
        from: 12,
        to: 13,
        mLeft: '85%',
        stitle: '"enough now"',
        name: '러브액츄얼리',
        desc: '더 많은 사람들의 이야기가 궁금하지 않아?',
        desc2: '여기 그들의 사랑이야기!',
        li_1:'사람들을 참 좋아해서 인기많은 당신!',
        li_2:'이번 크리스마스도 행복할 거 같은데?',
        li_3:'당신의 마음에 딱 맞는 따뜻한 영화!',
        li_4:'12%의 사람들이 당신과 같은 영화를 좋아한대요!',
        subt:'“나에게 있어 당신은 완벽해요”'
    },
    {
        from: 13,
        to: 14,
        mLeft: '85%',
        stitle: '"무한한 공간 저너머로"',
        name: '토이스토리',
        desc: '버즈처럼 대담하고 통솔력 있는 당신!',
        desc2: '이미 이번 크리스마스도 신나있군요?!',
        li_1:'대담하고 상상력이 풍부한 리더!',
        li_2:'어떻게든 새로운 방안을 창출해간다!',
        li_3:'올해는 새로운 방법으로 크리스마스를 즐기시는가?',
        li_4:'3%의 사람들이 당신과 같은 영화를 좋아한대요!',
        subt:'“무한한 공간 저너머로!”'
    },
    {
        from: 14,
        to: 15,
        mLeft: '85%',
        stitle: '"내 이름은 코난, 탐정이죠"',
        name: '명탐정 코난',
        desc: '누구보다 논리적인 당신!',
        desc2: '코난이 딱 어울리지 않아요?',
        li_1:'모든 건 사실 기반으로!',
        li_2:'누구보다 책임감이 강한 타입!',
        li_3:'그런데도 솔로인,,,범인은 바로 너!',
        li_4:'13% 이상의 사람들이 당신과 같은 영화를 좋아한대요!',
        subt:'“내 이름은 코난, 탐정이죠.”'
    },
    {
        from: 15,
        to: 16,
        mLeft: '85%',
        stitle: '"Let it go~"',
        name: '겨울왕국',
        desc: '뛰어난 실력을 가진 여왕 엘사!',
        desc2: '이건 사실 나의 모습?!',
        li_1:'누구보다 뛰어난 관리자의 모습!',
        li_2:'당신, 모든 일에 체계적인데?',
        li_3:'엘사처럼 책임감있는 리더가 될 수 있어!',
        li_4:'11%의 사람들이 당신과 같은 영화를 좋아한대요!',
        subt:'“Let it go~”'
    }
]
const matchList = [
    {
        from: 0,
        to: 1,
        name: 'INFP - 열정적인 중재자',
        desc: '감정기복 제일 심함. 멘탈 제일 약함'
    },
    {
        from: 1,
        to: 2,
        name: 'ENFP - 재기발랄한 활동가 ',
        desc: '감정이 풍부하고 그 감정이 표정에서 다 드러남'
    },
    {
        from: 2,
        to: 3,
        name: 'ISFP - 호기심 많은 예술가',
        desc: '나 안착한데, 사람들이 왜 착하다고 하는지 모르겠음'
    },
    {
        from: 3,
        to: 4,
        name: 'INTP - 논리적인 사색가',
        desc: '비 논리적이고 어리석은 사람들 보면 화가 너무남. 남이 내 욕하는 하는거 신경 안쓰고 남욕도 안함'
    },
    {
        from: 4,
        to: 5,
        name: 'INFJ - 선의의 옹호자',
        desc: '절친이나 가족에게 예외없이 선이 있음'
    },
    {
        from: 5,
        to: 6,
        name: 'ESFP - 자유로운 영혼의 연예인',
        desc: '잘먹고, 잘자고, 생각이 단순함'
    },
    {
        from: 6,
        to: 7,
        name: 'ENTP - 뜨거운 논쟁을 즐기는 변론가',
        desc: '일단 하고 봄, 일단 저지르고 생각은 나중에'
    },
    {
        from: 7,
        to: 8,
        name: 'ENFJ - 정의로운 사회운동가',
        desc: '오지랖 심함.'
    },
    {
        from: 8,
        to: 9,
        name: 'ISTP - 만능 재주꾼',
        desc: '얘는 왜 이렇게 쓸데없는 말을 많이 하는지 이해가 안감'
    },
    {
        from: 9,
        to: 10,
        name: 'ISFJ - 용감한 수호자',
        desc: '부탁받으면 거절 진짜 못함. 반대로 남한테 부탁하는건 어려움'
    },
    {
        from: 10,
        to: 11,
        name: 'INTJ - 용의주도한 전략가',
        desc: '나 오늘 바뀐거 없어? 하면 대답 못함'
    },
    {
        from: 11,
        to: 12,
        name: 'ESTP - 모험을 즐기는 사업가',
        desc: '돌직구 던진다는 소리 자주 들음'
    },
    {
        from: 12,
        to: 13,
        name: 'ESFJ - 사교적인 외교관',
        desc: '다른 사람한테 인정받을 때 기분좋음'
    },
    {
        from: 13,
        to: 14,
        name: 'ENTJ - 대담한 통솔자',
        desc: '비효율적인 관습 제일 싫어함(꼰대들한테 제일 많이 개김)'
    },
    {
        from: 14,
        to: 15,
        name: 'ISTJ - 청렴결백한 논리주의자',
        desc: '융통성 없는 꼰대가르송이 되기도 함'
    },
    {
        from: 15,
        to: 16,
        name: 'ESTJ - 엄격한 관리자',
        desc: '싸우는 거 싫어하지만 싸워서 지는 걸 더 싫어함'
    }
]

const unmatchList = [
    {
        from: 0,
        to: 1,
        name: 'INFP - 열정적인 중재자',
        desc: '감정기복 제일 심함. 멘탈 제일 약함'
    },
    {
        from: 1,
        to: 2,
        name: 'ENFP - 재기발랄한 활동가 ',
        desc: '감정이 풍부하고 그 감정이 표정에서 다 드러남'
    },
    {
        from: 2,
        to: 3,
        name: 'ISFP - 호기심 많은 예술가',
        desc: '나 안착한데, 사람들이 왜 착하다고 하는지 모르겠음'
    },
    {
        from: 3,
        to: 4,
        name: 'INTP - 논리적인 사색가',
        desc: '비 논리적이고 어리석은 사람들 보면 화가 너무남. 남이 내 욕하는 하는거 신경 안쓰고 남욕도 안함'
    },
    {
        from: 4,
        to: 5,
        name: 'INFJ - 선의의 옹호자',
        desc: '절친이나 가족에게 예외없이 선이 있음'
    },
    {
        from: 5,
        to: 6,
        name: 'ESFP - 자유로운 영혼의 연예인',
        desc: '잘먹고, 잘자고, 생각이 단순함'
    },
    {
        from: 6,
        to: 7,
        name: 'ENTP - 뜨거운 논쟁을 즐기는 변론가',
        desc: '일단 하고 봄, 일단 저지르고 생각은 나중에'
    },
    {
        from: 7,
        to: 8,
        name: 'ENFJ - 정의로운 사회운동가',
        desc: '오지랖 심함.'
    },
    {
        from: 8,
        to: 9,
        name: 'ISTP - 만능 재주꾼',
        desc: '얘는 왜 이렇게 쓸데없는 말을 많이 하는지 이해가 안감'
    },
    {
        from: 9,
        to: 10,
        name: 'ISFJ - 용감한 수호자',
        desc: '부탁받으면 거절 진짜 못함. 반대로 남한테 부탁하는건 어려움'
    },
    {
        from: 10,
        to: 11,
        name: 'INTJ - 용의주도한 전략가',
        desc: '나 오늘 바뀐거 없어? 하면 대답 못함'
    },
    {
        from: 11,
        to: 12,
        name: 'ESTP - 모험을 즐기는 사업가',
        desc: '돌직구 던진다는 소리 자주 들음'
    },
    {
        from: 12,
        to: 13,
        name: 'ESFJ - 사교적인 외교관',
        desc: '다른 사람한테 인정받을 때 기분좋음'
    },
    {
        from: 13,
        to: 14,
        name: 'ENTJ - 대담한 통솔자',
        desc: '비효율적인 관습 제일 싫어함(꼰대들한테 제일 많이 개김)'
    },
    {
        from: 14,
        to: 15,
        name: 'ISTJ - 청렴결백한 논리주의자',
        desc: '융통성 없는 꼰대가르송이 되기도 함'
    },
    {
        from: 15,
        to: 16,
        name: 'ESTJ - 엄격한 관리자',
        desc: '싸우는 거 싫어하지만 싸워서 지는 걸 더 싫어함'
    }
]