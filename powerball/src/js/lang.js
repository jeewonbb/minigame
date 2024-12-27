var lang = [];

export function getLang(category, code,langcode){
    if ( category == undefined || code == undefined ) 
        return "";
    else if ( lang[category] != undefined && lang[category][code] != undefined && lang[category][code][langcode] ) 
        return lang[category][code][langcode];
    else 
        return code;
}

lang = {
    "general": {
        "init": {
            "en": "RESET",
            "ko": "초기화"
        },
        "rebet": {
            "en": "REBET",
            "ko": "재베팅"
        },
        "confirm": {
            "en": "CONFIRM",
            "ko": "베팅확인"
        },
        "confirm1": {
            "en": "CONFIRM",
            "ko": "확인"
        },
        "bet": {
            "en": "BET",
            "ko": "BET"
        },
        "win": {
            "en": "WIN",
            "ko": "WIN"
        },
        "credit": {
            "en": "CREDIT",
            "ko": "CREDIT"
        },
        "round": {
            "en": "Round",
            "ko": "회차"
        },
        "roundid": {
            "en": "Round ID",
            "ko": "회차 ID"
        },
        "date": {
            "en": "Date",
            "ko": "날짜"
        },
        "betcancel": {
            "en": "UNDO",
            "ko": "실행취소"
        },
        "autobet": {
            "en": "AUTO BET",
            "ko": "자동베팅"
        },
        "setting": {
            "en": "MORE",
            "ko": "더보기"
        },
        "sound": {
            "en": "Sound",
            "ko": "사운드"
        },
        "guide": {
            "en": "Manual",
            "ko": "매뉴얼"
        },
        "analysis": {
            "en": "Analysis",
            "ko": "통계"
        },
        "detailinfo": {
            "en": "Detail Info",
            "ko": "게임 세부 정보"
        },
        "function": {
            "en": "Function",
            "ko": "기능"
        },
        "game_result": {
            "en": "Round Results",
            "ko": "회차 결과"
        },
        "history": {
            "en": "Game History",
            "ko": "베팅내역"
        },
        "distribution_chart": {
            "en": "Live Dstribution",
            "ko": "실시간 분포도"
        },
        "total": {
            "en": "Total",
            "ko": "합계"
        },
        "all_market": {
            "en": "All Market",
            "ko": "전체마켓"
        },
        "all_menu": {
            "en": "All Menu",
            "ko": "전체 메뉴"
        },
        "main_market": {
            "en": "Main Market",
            "ko": "메인마켓"
        },
        "bet_table_1": {
            "en": "Bet Type",
            "ko": "베팅타입"
        },
        "bet_table_2": {
            "en": "Bet",
            "ko": "베팅"
        },
        "bet_table_3": {
            "en": "Win",
            "ko": "당첨금"
        },
        "bet_table_4": {
            "en": "Total Bet",
            "ko": "총 베팅"
        },
        "bet_table_5": {
            "en": "Total Win",
            "ko": "총 당첨금"
        },
        "win_1": {
            "en": "Win",
            "ko": "승"
        },
        "result": {
            "en": "Result",
            "ko": "결과"
        },
        "dragon": {
            "en": "Dragon",
            "ko": "드래곤"
        },
		"draw": {
            "en": "Tie",
            "ko": "무승부"
        },
		"suited_draw": {
            "en": "<b>Suited</b>Tie",
            "ko": "<b>수티드</b>무승부"
        },
		"tiger": {
            "en": "Tiger",
            "ko": "타이거"
        },
        "dragon_s": {
            "en": "D",
            "ko": "D"
        },
        "tiger_s": {
            "en": "T",
            "ko": "T"
        },
        "draw_s": {
            "en": "T",
            "ko": "T"
        },
        "betcode_1_1": {
            "en": "scissors",
            "ko": "가위"
        },
        "betcode_1_2": {
            "en": "rock",
            "ko": "바위"
        },
        "betcode_1_3": {
            "en": "paper",
            "ko": "보"
        },
        "scissors": {
            "en": "scissors",
            "ko": "가위"
        },
        "rock": {
            "en": "rock",
            "ko": "바위"
        },
        "paper": {
            "en": "paper",
            "ko": "보"
        },
        "betcode_4_1": {
            "en": "Suited Tie",
            "ko": "수티드 무승부"
        },
        "analysis_title1": {
            "en": "Result",
            "ko": "결과"
        },
        "analysis_title2": {
            "en": "Number of Lines",
            "ko": "라인 수"
        },
        "analysis_title3": {
            "en": "Arrival Direction",
            "ko": "도착방향"
        }, 
        "analysis_title1_s": {
            "en": "Result",
            "ko": "결과"
        },
        "analysis_title2_s": {
            "en": "Lines",
            "ko": "라인 수"
        },
        "analysis_title3_s": {
            "en": "Arrival",
            "ko": "도착방향"
        }, 
        "betting_now": {
            "en": "Betting",
            "ko": "베팅 중"
        },
        "win_now": {
            "en": "Drawing",
            "ko": "추첨 중"
        },
        "win_lose": {
            "en": "win or lose",
            "ko": "승패"
        },
        "rotate_device": {
			"en":"Please rotate the device.",
            "ko":"기기를 회전시켜 주십시오."
		},
        "sound_1": {
			"en":"BGM",
            "ko":"BGM"
		},
        "sound_2": {
			"en":"Effect",
            "ko":"효과음"
		},
        "title_sound": {
			"en":"Sound",
            "ko":"사운드"
		},
        "process": {
			"en":"Process",
            "ko":"진행중"
		},
        "win_txt": {
			"en":"Win",
            "ko":"이겼다"
		},
        "lose_txt": {
			"en":"Lose",
            "ko":"졌다"
		},
        "draw_txt": {
			"en":"Draw",
            "ko":"비겼다"
		},
        "2000": {
			"en": "Login failed.",
			"ko": "로그인에 실패했습니다."
		},
        "2001": {
			"en": "Unable to find user information.",
			"ko": "유저정보를 찾을수가 없습니다."
		},
		"5001": {
			"en": "Bet failed.",
			"ko": "베팅에 실패했습니다."
		},
		"5002": {
			"en": "Bet error occurred.",
			"ko": "베팅에 오류가 발생했습니다."
		},
		"5003": {
			"en": "Bet amount is lower than the minimum bet amount.",
			"ko": "베팅금액이 최소베팅보다 작습니다."
		},
		"5004": {
			"en": "Bet amount is higher than the maximum bet amount.",
			"ko": "베팅금액이 최대베팅보다 큽니다."
		},
		"5005": {
			"en": "The bet has been prohibited.",
			"ko": "베팅이 금지되었습니다."
		},
		"5006": {
			"en": "The amount is lower than the total bet amount.",
			"ko": "전체베팅금액보다 작습니다."
		},
		"5007": {
			"en": "The amount is higher than the total bet amount.",
			"ko": "전체베팅금액보다 큽니다."
		},
		"5008": {
			"en": "Bet has been prohibited.",
			"ko": "베팅이 금지되었습니다."
		},
		"5009": {
			"en": "The amount is higher than the maximum prize(amount).",
			"ko": "최대당첨금액보다 큽니다."
		},
		"5010": {
			"en": "Invalid bet information.",
			"ko": "잘못된 베팅정보입니다."
		},
		"5011": {
			"en": "Insufficient balance.",
			"ko": "밸런스가 부족합니다."
		},
        "5012": {
			"en": "Bet has been prohibited.",
			"ko": "베팅이 금지되었습니다."
		},
		"5100": {
			"en": "Server error occurred.",
			"ko": "서버에서 오류가 발생했습니다."
		},
		"disconnect": {
			"en": "Unable to connect to game server.",
			"ko": "게임서버와 연결할 수 없습니다"
		},
		"nobet": {
			"en": "Please set your bet amount.",
			"ko": "베팅정보가 없습니다."
		},
		"betCannotBeReset": {
			"ko":"확정된 베팅은 초기화 할 수 없습니다.",
			"en":"Unable to reset the confirmed bet amount."
		},
		"notHavePrevBet": {
            "ko":"이전 베팅 정보가 없습니다.",
            "en":"There is no previous bet information."
        },
		"alreadyPlaying": {
			"ko":"게임이 이미 시작되었습니다.\n잠시만 기다려 주세요.",
			"en":"The game has already started.\nPlease join the next round."
		},
		"reconnectPlease": {
			"ko":"게임중 오류가 발생했습니다.\n다시 접속해 주세요.",
			"en":"An error occurred during the game.\nPlease reconnect."
		},
		"waitingForGame": {
			"ko":"다음 게임을 기다려 주세요.",
			"en":"Please wait for the next game."
		},
		"maintenance": {
			"ko":"점검중입니다.",
			"en":"Under maintenance."
		},
		"waitingForBets": {
			"ko":"배팅시간 조정 중입니다.",
			"en":"Adjusting betting time."
		},
		"shoeChange": {
			"ko":"새로운 회차를 위해\n슈 교체 중 입니다.\n잠시후 게임이 시작됩니다.",
			"en":"The shoe is being replaced\nfor a new round.\nThe game will start in a few moment."
		},
		"closingInfo1": {
			"ko":"휴장 안내",
			"en":"Closing Information"
		},
		"closingInfo2": {
			"ko":"지금은 추첨 휴장 시간입니다.",
			"en":"It's time to close the Draw."
		},
		"rotateDevice": {
			"ko": "기기를 회전시켜 주십시오.",
			"en": "PLEASE ROTATE YOUR DEVICE."
		},
		"ws_onclose": {
			"ko":"서버 연결이 종료되었습니다.",
			"en":"Server disconnected."
		},
		"game_111_5": {
			"ko":"최소 한도 미만의 베팅입니다.<BR>(최소 : ",
			"en":"Bet amounts lower than minimum bet.<BR>(MIN : "
		},
		"game_111_6": {
			"ko":"최대 한도를 초과하는 베팅입니다.<BR>(최대 : ",
			"en":"Bet amounts exceeded maximum limit.<BR>(MAX : "
		},
		"game_111_7": {
			"ko":"알수없는 에러가 발생했습니다.",
			"en":"Unknown error has occurred."
        },
        "document_footer": {
			"ko":"※ 최신 데이터 기준, 최대 50개 통계/분포도 제공",
			"en":"※ Up to 50 Stats/Distributions from latest data"
        },
        "document_footer1": {
			"ko":"최신 베팅 내역 100건만 제공",
			"en":"Only 100 latest bets shown"
        },
        "break": {
            "ko": "꺽음",
            "en": "Br"
        },
        "fondant": {
            "ko": "퐁당",
            "en": "Fo",
        },
        "break1": {
            "ko": "꺽음",
            "en": " "
        },
        "fondant1": {
            "ko": "퐁당",
            "en": " ",
        },
        "consecutive": {
            "ko": "연속",
            "en": " straight"
        },
        "times": {
            "en": " ",
            "ko": "번"
        },
        "title_docuemnt": {
			"en":"Draws every 20 sec based on Cryptocurrency price value",
            "ko":"가상화폐 시세 결과 값을 기준으로 20초마다 추첨"
		},
        "del": {
            "en": "Del",
            "ko": "Del"
        },
        "place_bet": {
            "en": "Place Bet",
            "ko": "Place Bet"
        },
        "min": {
            "en": "Min",
            "ko": "Min"
        },
        "max": {
            "en": "Max",
            "ko": "Max"
        },
        "betting_type1": {
            "en": "Chip Mode",
            "ko": "베팅 선택"
        },
        "betting_type2": {
            "en": "Custom Mode",
            "ko": "베팅 입력"
        },
    }   
}