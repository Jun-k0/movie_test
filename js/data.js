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
        q: '1. 회의에 들어가면 힘이 빠지는 편인가요?',
        a: [
            { answer: '예', energy_score: 0 },
            { answer: '아니오 ', energy_score: 1 }
            ]
    },
    {
        q: '2. 어디에서 일하는 것을 선호하시는 편인가요?',
        a: [
            { answer: '사무실 안 내 자리', energy_score: 0 },
            { answer: '라운지', energy_score: 1 }
            ]
    },
    {
        q: '3. 문제가 닥쳤을 때',
        a: [
            { answer: '생각이 많아진다.', energy_score: 0 },
            { answer: '말이 많아진다.', energy_score: 1 }
            ]
    },
    {
        q: '4. 내가 추구하는 것은?',
        a: [
            { answer: '가성비', perception_score: 0 },
            { answer: '가심비', perception_score: 1 }
            ]
    },
    {
        q: '5. 누군가 슬랙에 글을 올렸다.',
        a: [
            { answer: '오탈자가 있는지 먼저 봄 ', perception_score: 0 },
            { answer: '전체적인 맥락을 파악하려고 함', perception_score: 1 }
        ]
    },
    {
        q: '6. 영화를 보고 나와서 "영화 어땠어?"',
        a: [
            { answer: '줄거리에 대해서 얘기함', perception_score: 0 },
            { answer: '감독의 의도에 대해서 얘기함', perception_score: 1 }
        ]
    },
    {
        q: '7. 친구가 차사고가 났다. 친구한테 먼저 하는 말은?',
        a: [
            { answer: '괜찮아? 많이 다쳤어??!!ㅠㅠㅜ', decision_score: 0 },
            { answer: '보험 불렀어? 병원은?', decision_score: 1 }
        ]
    },
    {
        q: '8. "나 힘들게 돈 모아서 아이패드 샀어" 어떤 구문이 먼저 눈에 들어오세요?',
        a: [
            { answer: '힘들게 돈 모아서', decision_score: 0 },
            { answer: '아이패드 샀어', decision_score: 1 }
        ]
    },
    {
        q: '9. "나 오늘 화나는 일 있어서 단거 먹었어"에 대한 나의 답변은',
        a: [
            { answer: '왜 화났어?ㅠㅠㅜ', decision_score: 0 },
            { answer: '헉ㅋㅋ 뭐 먹었는데?', decision_score: 1 }
        ]
    },
    {
        q: '10. 계획을 세우고 일 처리를 하시는 편인가요?',
        a: [
            { answer: '예', pattern_score: 0 },
            { answer: '아니', pattern_score: 1 }
        ]
    },
    {
        q: '11. 점심 먹는 시간이 대체로 일정하신 편인가요?',
        a: [
            { answer: '예', pattern_score: 0 },
            { answer: '아니오', pattern_score: 1 }
        ]
    },
    {
        q: '12. 여행을 갔다',
        a: [
            { answer: '아침부터 저녁 그리고 숙소까지 다 예약한다.', pattern_score: 0 },
            { answer: '그냥 발 닿는 대로 간다. ', pattern_score: 1 }
        ]
    }
]

const infoList = [
    {
        from: 0,
        to: 1,
        mLeft: '10%',
        stitle: '착해요',
        name: 'INFP - 열정적인 중재자',
        desc: '감정기복 제일 심함. 멘탈 제일 약함',
        li_1:'암거나'
    },
    {
        from: 1,
        to: 2,
        mLeft: '25%',
        stitle: '나빠요',
        name: 'ENFP - 재기발랄한 활동가 ',
        desc: '감정이 풍부하고 그 감정이 표정에서 다 드러남',
        li_1:'암거나'
    },
    {
        from: 2,
        to: 3,
        mLeft: '40%',
        stitle: '착해요',
        name: 'ISFP - 호기심 많은 예술가',
        desc: '나 안착한데, 사람들이 왜 착하다고 하는지 모르겠음',
        li_1:'암거나'
    },
    {
        from: 3,
        to: 4,
        mLeft: '55%',
        stitle: '착한척해요',
        name: 'INTP - 논리적인 사색가',
        desc: '비 논리적이고 어리석은 사람들 보면 화가 너무남. 남이 내 욕하는 하는거 신경 안쓰고 남욕도 안함',
        li_1:'암거나'
    },
    {
        from: 4,
        to: 5,
        mLeft: '70%',
        name: 'INFJ - 선의의 옹호자',
        stitle: '나쁜척해요',
        desc: '절친이나 가족에게 예외없이 선이 있음',
        li_1:'암거나'
    },
    {
        from: 5,
        to: 6,
        mLeft: '85%',
        stitle: '독특해',
        name: 'ESFP - 자유로운 영혼의 연예인',
        desc: '잘먹고, 잘자고, 생각이 단순함',
        li_1:'암거나'
    },
    {
        from: 6,
        to: 7,
        mLeft: '85%',
        stitle: '뜨거워요 핫해',
        name: 'ENTP - 뜨거운 논쟁을 즐기는 변론가',
        desc: '일단 하고 봄, 일단 저지르고 생각은 나중에',
        li_1:'암거나'
    },
    {
        from: 7,
        to: 8,
        mLeft: '85%',
        stitle: '정의롭넹',
        name: 'ENFJ - 정의로운 사회운동가',
        desc: '오지랖 심함.',
        li_1:'암거나'
    },
    {
        from: 8,
        to: 9,
        mLeft: '85%',
        stitle: '말이 너무 많아',
        name: 'ISTP - 만능 재주꾼',
        desc: '얘는 왜 이렇게 쓸데없는 말을 많이 하는지 이해가 안감',
        li_1:'암거나'
    },
    {
        from: 9,
        to: 10,
        mLeft: '85%',
        stitle: '용감해요 ',
        name: 'ISFJ - 용감한 수호자',
        desc: '부탁받으면 거절 진짜 못함. 반대로 남한테 부탁하는건 어려움',
        li_1:'암거나'
    },
    {
        from: 10,
        to: 11,
        mLeft: '85%',
        stitle: '뒤에서 꼼수 부려요 ',
        name: 'INTJ - 용의주도한 전략가',
        desc: '나 오늘 바뀐거 없어? 하면 대답 못함',
        li_1:'암거나'
    },
    {
        from: 11,
        to: 12,
        mLeft: '85%',
        stitle: '스릴을 즐겨요 ',
        name: 'ESTP - 모험을 즐기는 사업가',
        desc: '돌직구 던진다는 소리 자주 들음',
        li_1:'암거나'
    },
    {
        from: 12,
        to: 13,
        mLeft: '85%',
        stitle: '친화력이 좋아요 ',
        name: 'ESFJ - 사교적인 외교관',
        desc: '다른 사람한테 인정받을 때 기분좋음',
        li_1:'암거나'
    },
    {
        from: 13,
        to: 14,
        mLeft: '85%',
        stitle: '담대하고 효율적이네요 ',
        name: 'ENTJ - 대담한 통솔자',
        desc: '비효율적인 관습 제일 싫어함(꼰대들한테 제일 많이 개김)',
        li_1:'암거나'
    },
    {
        from: 14,
        to: 15,
        mLeft: '85%',
        stitle: '깨끗해요 ',
        name: 'ISTJ - 청렴결백한 논리주의자',
        desc: '융통성 없는 꼰대가르송이 되기도 함',
        li_1:'암거나'
    },
    {
        from: 15,
        to: 16,
        mLeft: '85%',
        stitle: '승부욕이 강해요 ',
        name: 'ESTJ - 엄격한 관리자',
        desc: '싸우는 거 싫어하지만 싸워서 지는 걸 더 싫어함',
        li_1:'암거나'
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