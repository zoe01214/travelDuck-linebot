import linebot from 'linebot'
import dotenv from 'dotenv'
import axios from 'axios'
import schedule from 'node-schedule'

let data = []
const joke = [
  '有時候也很佩服自己，明明薪水這麼少，卻能把自己養這麼胖。',
  '母雞向母牛抱怨：「真受不了人類，他們每天用盡方法避孕，卻讓我們下蛋！」\n\n母牛回答：「那算什麼！他們每天喝我的奶，卻沒人叫我一聲媽咪。」',
  '媽媽指著食人魚跟女兒說：「女兒，你看，這是會吃人的魚。」\n\n而食人魚媽媽則跟食人魚女兒說：「女兒，你看，這是會吃魚的人。」',
  '你知道天上的星星一顆有多重嗎？\n\n答案是八公克……因為 星巴克！',
  '朋友問我說情人節我還是一個人嗎？\n\n廢話！難道我會變成一條狗嗎？',
  '有一個男人站在診所外面，門口大叫：掛號！\n護士說：請進。\n男人叫：掛號！\n護士：進來呀！\n男人：掛號啦！\n診所裡的護士就不耐煩了：我說幾次要掛號就進來掛！\n\n「我是郵差！」',
  '一對夫妻在高級餐廳吃飯，上完菜之後，丈夫說道：「看起來都好好吃，快吃吧！」\n妻子：親愛的，你在家吃飯前不是都要先祈禱嗎？\n丈夫：那是因為在家，這裡廚師應該知道怎麼做菜。',
  '有一隻狼寶寶不吃肉只吃素，狼媽媽、狼爸爸看得很擔心，\n某天，狼寶寶終於追著一隻兔子跑，牠們感到很欣慰，狼寶寶抓到兔子後說：\n快把紅蘿蔔交出來！',
  '大部分的女生，晚上九點之後都不接視訊電話，因為...已經大家的臉都恢復了原廠設定。',
  '有一天早晨，一個人去參觀美術館。\n 他問一個導覽員： 「這是米勒拾穗的畫嗎？」\n 導覽員搖搖頭，說： 「這是他四十三歲的畫。」',
  '壞事一定要中午在做 因為……早晚會有報應',
  '你知道冰塊最想做甚麼事嗎？\n\n 退伍，因為他當冰很久了',
  '有一天伍佰打了玖哲一下，他就變成四百五了',
  '為什麼柯南都穿同一套衣服\n\n因為怕別人說 哇～ 新衣耶',
  '你知道什麼門最有錢嗎\n\n雲門 因為雲門舞集',
  '為什麼模範生容易被綁架?\n\n因為他一副好綁樣....',
  '有個人對著山洞大喊 : 嗚郎滴欸某？？山洞裡有聲音回答: 嗚 ～\n\n然後他就被火車撞死了',
  '有一天，有個帥哥走在路上，一個阿嬤突然上前搭訕說：「帥哥，你超會搭耶！」\n\n然後，帥哥就冒煙了。',
  '為什麼放連假的時候不能去工作？\n\n因為會變成連假勞工',
  '青蛙吃什麼不會叫？\n\n答案是 ～ ～ 南瓜 ( 難呱 ) 呱..呱...呱....',
  '阮經天的舅公 是誰\n\n答案是：軟骨功(阮 ㄍㄨˇ ㄍㄨㄥ )',
  '小狗跟貓咪誰先上台背課文\n\n小狗 旺旺仙貝',
  '有一天螃蟹走在沙灘上，走著走著然後踩到了海星，海星大罵：你瞎子嗎 走路不看路啊！\n\n螃蟹回：不是，我是螃蟹。',
  '哈利波特裡面誰最有主見？\n\n佛地魔，因為他不會被牽著鼻子走。',
  '大雄是什麼宗教的？\n\n答：道教，因為他喜歡靜香（進香）',
  '液晶的媽媽叫什麼名字？\n\n液晶螢幕 ( 台語 )',
  '有一天一隻大魚跟小魚在講話⋯⋯\n大魚：欸小魚你知道我們的記憶力只有三秒嗎？\n小魚：真的假的？\n大魚：蛤什麼東西真的假的？',
  '為什麼兩隻螞蟻在沙灘上行進沒有足跡？\n\n因為他們騎腳踏車。',
  '為什麼小明沒有開冰箱就知道冰箱裡有螞蟻？\n\n因為冰箱外停著螞蟻的腳踏車。',
  '為什麼衣索比亞沒有藥局？\n\n因為醫生說空腹不能吃藥。',
  '什麼食物最常被揍？\n哇沙米，因為他很嗆！\n\n什麼東西總是跩個二五八萬？\n火車，因為他欠嗆欠嗆欠嗆！',
  '有一天Y跟X走在路上，突然看到U哭得很傷心，Y就走過去問U說\n\nuniqlo～',
  '張雨生家裡的木頭都怎麼來的？\n\n雨生鋸來的。',
  '蛤蜊擺久了會變什麼？\n\n白酒蛤蜊',
  '媽媽弄丟了一個東西，為什麼媽媽還特別高興?\n\n答:她丟掉了壞習慣',
  '王老太太整天喋喋不休，可他有一個月說話最少，是哪一個月?\n\n答:二月',
  '為什麼把刀塗成藍色的槍就會很憂鬱?\n\n答:刀槍不入(BLUE)',
  '什麼時候二加一會不等於三?\n\n答:算錯的時候',
  '有十隻羊，九隻蹲在羊圈，一隻蹲在豬圈?\n\n答:抑揚頓挫(一羊蹲錯)',
  '人最怕屁股上有什麼東西?\n\n答:一屁股債',
  '羊打電話給老鷹，老鷹接起電話說:喂?\n\n答:陽奉陰違(羊PHONE鷹-喂)',
  '古人為什麼要臥冰求鯉?\n\n答:彬彬有禮(冰冰有鯉)',
  '百貨公司裡有個禿頭推銷員正在推銷生髮水，但為什麼他自己不用生髮水?\n\n答:他想讓大家知道禿頭有多麼難看',
  '蔣公如果還在世的話，世界會怎樣?\n\n答:多一個人',
  '上完廁所，要用左手還是右手擦屁股會比較好?\n\n答:用衛生紙擦比較好',
  '夫妻之間一定都會有的共通點是什麼？\n\n答:同年同月同日結婚',
  '小張被關在一間沒有上鎖的房間裡，可是即使他使出全力也拉不開門，這是怎麼回事?\n\n答:門是要用推開的',
  '報紙上登的消息不一定百分之百是真的，但什麼消息絕對假不了?\n\n答:報紙上的年月日',
  '芥末生日哪一天?\n\n答:世界末日(是芥末日)',
  '汽車會飛，猜一種飲料?\n\n答:咖啡 (Car飛)',
  '為什麼不讀師大附中?\n\n答:胎死腹中(附中)',
  '小貓、小狗和小雞誰會先被叫起來背書?\n\n答:小狗(旺旺仙貝)',
  '為什麼畫家喜歡畫粗的繩子不喜歡畫細的繩子?\n\n答:出神入化(粗繩入畫)',
  '綠豆哪裡人?\n\n答:嘉義人(綠豆加薏仁)',
  '哪首歌歌詞有李玟?\n\n答:月亮代表我的心 (因為李玟~我愛你有多深..)',
  '什麼卡通人物最血腥?\n\n答:麵包超人 (因為他的頭可以吃)',
  '先有男生還是先有女生?\n\n答:男生(因為他們都叫先生)',
  '南半球為什麼沒有廟宇?\n\n答:因為南無阿彌陀佛',
  '什麼花一下子就不見了？\n\n答:火花',
  '青春痘長在哪裏最不用擔心?\n\n答:別人的臉上',
  '白飯跌倒變成什麼?\n\n答:紫米飯(瘀青了)',
  '城市，鄉下哪一個地方的河流比較急?\n\n答:鄉下(相煎何太急)',
  '誰最不孝順老媽?\n\n答:面速力...因為面速力 打母',
  '飲水思源，猜台灣地名\n\n答:知本(台東縣)',
  '頑皮豹的職業是什麼?\n\n答:打蠟的，因為頑皮豹主題歌的前奏',
  '小叮噹是什麼顏色的?\n\n答:紅色，因為ㄤㄤㄤ小叮噹為我實現所有的願望',
  '無聊的時候，開車閒晃，猜一種藥品?\n\n答:白花油',
  '象皮、老虎皮、獅子皮，哪一個最不好?\n\n答:象皮(橡皮擦)',
  '在什麼情形下你會覺得自己很抖?\n\n答:練外丹功的時候',
  '為什麼廁所要設天花板?\n\n答:因為老天有眼(會看光光)',
  '滿滿一杯啤酒，怎麼樣才能先喝到杯底的酒?\n\n答:用吸管',
  '氣球內有空氣，那游泳圈內有什麼?\n\n答:不會游泳的人',
  '到北極後，絕對不能做什麼事?\n\n答:向北走',
  '月圓之夜，全世界的鬼魂都聚集在一起開狂歡大會，但偏偏只有狼人沒有到，為什麼?\n\n答:狼人是妖怪不是鬼',
  '是最失敗的人?\n\n答:蜘蛛人(因為spiderman(失敗的man))',
  '哪個歷史人物最欠扁?\n\n答:蘇武(因為蘇武牧羊北海邊(被海扁))',
  '什麼東西在倒立之後會增加一半?\n\n答:六(6)',
  '老闆和員工，誰比較大?\n\n答:要看身分證才知道',
  '有一位老奶奶在看報，一隻蚊子正想要叮她，老奶奶手和腳都沒動，為什麼蚊子會突然死掉?\n\n答:被老奶奶的皺紋夾死了',
  '地震的時候，在什麼地方最安全?\n\n答:在飛機上',
  '吃飽飯了誰會幫您添飯?\n\n答:飛龍，因為飛龍在天(添)',
  '為什麼狐狸常常跌倒?\n\n答:因為腳滑(狡猾)',
  '廁所裡掛鬧鐘(猜成語)\n\n答:有始有終(有屎有鐘)',
  '男人最愛什麼車?\n\n答:電子花車',
  '颱風天要帶多少錢才能夠出門?\n\n答:四千萬(沒事千萬不要出門)',
  '大頭買了一雙鞋子，從來沒穿過，提著鞋子到處走，到底是為了什麼?\n\n答:他說鞋子穿久會壞',
  '上理化課時，將氯化鋇、硫酸銅、碳酸鈣三樣化學物質混合在一起結果會怎麼樣?\n\n答:被老師修理',
  '為什麼煙火都不會打到星星?\n\n答:星星會閃',
  '老陳工作一直閉著眼睛，從不睜開，他究竟是做什麼工作的?\n\n答:假裝瞎子乞討',
  '什麼事明明你沒有做竟然也要受罰?\n\n答:家庭作業',
  '誰會連續搖頭半個小時以上?\n\n答:看乒乓球賽的觀眾',
  '汽車在轉彎時，哪個輪胎不會動?\n\n答:備胎',
  '總統府前面那條路是什麼路?\n\n答:柏油路',
  '什麼帽子沒有人能戴?\n\n答:螺絲帽',
  '門裡站著一個人?(猜一個字)\n\n答:閃',
  '為何電腦不快樂?\n\n答:因為有D槽',
  '如果動物園失火了，最先逃出來的是哪一種動物?\n\n答:人',
  '什麼事會讓上面的人愉快，下面的人高興?\n\n答:演唱會',
  '去澎湖搭飛機和搭船最大的不同在哪裏?\n\n答:失事賠償金',
  '傘甲兵跳出飛機之後才發現忘了揹降落傘怎麼辦?\n\n答:兩眼開開，準備投胎',
  '一個男人可以一邊刷牙，一邊吹口哨，為什麼?\n\n答:因為他刷假牙',
  '什麼事是每個人睡覺時都要做的事?\n\n答:閉上眼睛',
  '進浴室洗澡時，要先脫衣服還是褲子?\n\n答:先關門比較好',
  '為什麼大家喜歡坐著看電影?\n\n答:站著腳痠',
  '黑熊、灰熊和白熊，哪一隻比較厲害?\n\n答:灰熊厲害(台語)',
  '什麼東西晚上才會生出尾巴?\n\n答:流星',
  '寡婦死了兒子誰最不幸?\n\n答:死去的丈夫',
  '一道彩虹有七種顏色，二道彩虹有幾種顏色?\n\n答:七種',
  '布和紙怕什麼?\n\n答:布怕一萬，紙怕萬一',
  '麒麟到了北極會變成什麼?\n\n答:冰淇淋',
  '9月28日是孔子誕辰，那10月28日是什麼日子?\n\n答:孔子滿月',
  '什麼動物最沒有方向感?\n\n答:麋鹿(迷路)',
  '廁所裡要放什麼花?\n\n答:五月花',
  '關雲長過海?(猜台灣一地名)\n\n答:關渡',
  '超人保護地球，那誰保護城市?\n\n答:螢幕，因為螢幕保護「程式」',
  '怎麼讓珍珠奶茶變大杯的?\n\n答:念大悲咒',
  '豆腐為什麼能打傷人?\n\n答:因為是凍豆腐',
  '醫生開刀為什麼要戴口罩?\n\n答:萬一手術失敗，才不會被認出來',
  '為什麼牛肉麵裡沒有牛肉?\n\n答:因為太陽餅裡沒有太陽',
  '這兩塊冰下有鯉魚?(猜一句成語)\n\n答:彬彬有禮(冰冰有鯉)',
  '一個人無法做，一群人做沒意思，兩個人做剛剛好，請問是什麼事?\n\n答:說悄悄話',
  '要考試了，不能看什麼書?\n\n答:百科全書(百科全輸)',
  '一個男人加一個女人會成了什麼?\n\n答:兩個人',
  '年年有餘，為什麼錢還是存不起來?\n\n答:因為年年都被炒魷魚',
  '什麼事情只能用一隻手去做?\n\n答:剪自己的手指甲',
  '在一次考試中，一對同學交了一模一樣的考卷，但老師認為他們肯定沒有作弊，這是為什麼?\n\n答:他們都交白卷',
  '一顆心值多少錢?\n\n答:一億(一心一意)',
  '白劉備、紅關公、鳥張飛，結兄弟?(猜台灣一地名)\n\n答:三義',
  '傘兵乙跳出飛機之後才發現忘了揹降落傘，可是後來他卻又飛了起來，為什麼?\n\n答:他已經變成天使了',
  '兩個男人坐在石頭上?(猜一句成語)\n\n答:一石二鳥',
  '海水為什麼是鹹的?\n\n答:魚流的淚太多了',
  '什麼東西的製造日期和有效日期是同一天?\n\n答:報紙',
  '觀光景點老街上來往最多的是什麼人?\n\n答:行人',
  '黑人為什麼喜歡吃白巧克力?\n\n答:怕咬到手指頭',
  '避孕藥的主要成分是什麼?\n\n答:抗生素',
  '數碼寶貝的白痴造句?\n\n答:今天吃素嗎?寶貝',
  '羊停止了呼吸?(猜一句成語)\n\n答:揚眉吐氣(羊沒吐氣)',
  '哪一種蛇生命力最強?\n\n答:三吋不爛之舌(蛇)',
  '如何不眼睜睜看著別人去送死?\n\n答:閉上眼睛',
  '哪一種花通常夏天是冰冷的，冬天是溫熱的?\n\n答:豆花',
  '哪個童話故事裡的人物最專情?\n\n答:美人魚(因為她不會劈腿)',
  '人類最後一顆牙齒是?\n\n答:假牙',
  '君子之交?(猜一地名)\n\n答:淡水(淡如水)',
  '懷胎十月?(猜一地名)\n\n答:大肚',
  '鴨子坐計程車?(猜一種瓜類)\n\n答:小黃瓜',
  '狗過了獨木橋就不叫了?(猜一成語)\n\n答:過目不忘(過木不汪)',
  '上課鈴鐘聲響了，卻沒有一個同學在教室裡，怎麼回事?\n\n答:上的是體育課',
  '有一天小美問小明說:「你們家是開甚麼的啊?」\n小明說:「我爸是開法拉利的，我媽是開保時捷的」\n小美一聽吃了一驚就再追問:「哇那你是開甚麼的啊?」\n\n小明回答:「喔，我開玩笑的。」',
  '有一天，周杰倫去唱尾牙\n\n一上台便說：哎呦，尾牙！',
  '我們來談談何謂生活小智慧吧 ：好了小智，就交給你去生火了～\n\n',
  '老師：小明，麻煩你過來一下 從此小明就變成了 過來人\n\n',
  '從前有一棵千年神木，村裡的人都稱之為\n\n超齡老木',
  '從前從前有一個人叫小明\n\n但是小明沒聽到',
  '小明在路上遇到警察 高興的喊著：警察杯杯～\n\n警察就把小明背起來了',
  '請問避孕藥的成分是什麼？？\n\n是抗生素。',
  '栗子掉到地上會變成什麼？\n\n血淋淋的栗子',
  '為什麼濁水溪跟曾文溪不能在一起？\n\n因為他們不是河',
  '太陽爸跟太陽媽生了一個小孩，該說什麼祝賀詞？\n\n生日快樂',
  '有一個脾氣很差的人，去簽了賣身契，從此以後他就不再生氣了！\n\n',
  '有一天，排汗衫對綿Ｔ說 哼！我才不希罕勒～\n\n',
  '有天小明搭公車，不小心把健保卡當作悠遊卡刷，健保卡就對小明說： 你為什麼要這樣逼我？\n\n',
  '為什麼不能一邊騎馬一邊烤肉？ \n\n因為騎中烤太難了',
  'Ｌ的過去式是什麼？\n\nＬＥＤ',
  '我說笑話誰會最支持我？\n\n校友 有校友推～',
  '毛利小五郎過暑假，就變成了毛利小六郎～',
  '小明生日，她許了三個願望，第一個願望祝家人身體健康，第二個願望祝我學業進步，第三個願望不能說。\n隔天小明就變成啞巴了。',
  '如果你很愛一個人，你要怎麼做？\n\n巴她六下（你那麼愛他，為什麼不巴他六下）',
  '兒子：爸，我是不是真的很笨啊？\n同學們都一直笑我傻\n父親：哎呀傻孩子，怎麼會呢？',
  '考期中考就跟當醫生一樣，出來第一句話就是我盡力了。',
  '有一天小明撞到一位外國人\n小明：I am sorry.\n外國人：I am sorry ,too.\n小明：I am sorry three.\n外國人：What are you sorry for?\n小明：I am sorry five….',
  '鴨子：誒誒烏龜我們來比賽看誰先讚美對方誰就輸了\n烏龜：好呀！\n鴨子勝。',
  '請用in put造句。\n\n觀世in put薩。',
  '死掉的腎臟，猜一本小說。\n\n猜不到，告訴我。',
  '女友傳訊息給男友說：「親愛的，你在睡嗎？那你把你的夢傳給我；你在笑嗎？那你把你的笑容傳給我？你在哭嗎？那你把你的眼淚傳給我。」\n\n男友：「我在大便。」',
  '先進船的人會先說什麼 ？\n\n會說online\n因為仙境傳說online',
  '有一天牙籤A跟牙籤B在馬路上相遇，\n突然一隻刺蝟快速的經過，\n牙籤A就對牙籤B說 :\n乾，我的公車過了...',
  '醫生問小明：如果把你一邊耳朵割掉你會怎麼樣？\n小明：我會聽不見\n醫生又問：那再割掉另一個耳朵呢？\n小明：我會看不見\n醫生問他為什麼...\n小明：因為我有戴眼鏡',
  '有一天小美對小明說：「你能為我而死嗎？」\n結果小明很驚訝的慢慢把手伸進耳朵...\n(餵我耳屎)',
  '客人吃完東西服務生問：那我收囉？\n客人：好\n然後服務生就開始跳舞了\n(收囉 = solo)',
  '有個人對著山洞大喊 : 嗚郎滴欸某??\n山洞裡有聲音回答: 嗚 ～\n然後他就被火車撞死了',
  '有一天有個帥哥走在路上\n一個阿嬤突然上前搭訕說「帥哥，你超會搭耶」\n然後帥哥就冒煙了\n(台語 : 超會搭 = 烤焦了)',
  '有一天小明去圖書館\n小明：我要一碗牛肉麵\n櫃檯：先生 這裡是圖書館 . . .\n小明：喔喔好 （氣音）我要一碗牛肉麵',
  '有一天 有一隻深海魚\n在海裡自由自在得游啊游 但他一點也不開心\n為什麼?\n\n因為他壓力好大',
  '哈利波特裡面誰最有主見？\n佛地魔，因為他不會被牽著鼻子走',
  '有一天郝棒棒 郝美麗 郝帥氣三個人去游泳\n結果三個人都溺水了，郝帥氣因為會游泳 所以先把郝美麗救上岸，\n郝美麗就問郝帥氣說\n\n啊不救郝棒棒?',
  '愚公臨死前召集兒子來到床邊虛弱的說：\n「移山…移山………」\n兒子：「亮晶晶？」\n愚公卒。',
  '劉備 字玄德\n張飛 字翼德\n五佰字？？\n\n心得',
  '有一天小明他爸很渴 就叫小明幫他倒水 但小明遲遲沒去倒 小明爸就說：「你是要逼爸渴死嗎？」\n\n於是小明就開始B Box了',
  '有一天張飛和關羽快樂的在草地上騎馬，關羽卻不知道他前方是懸崖\n張飛就對關羽大叫 : 「你快勒馬 ! 」\n關羽回頭就對張飛說 : 「我很快樂 ! 」\n於是關羽就掉下崖了....',
  '桃園三結義那天，\n張飛很滿意自己寫的字，轉頭對關羽說\n「我字好醜」\n於是關羽對張飛說\n「好醜你好，我字雲長」',
  '為什麼兩隻螞蟻在沙灘上行進沒有足跡\n因為他們騎腳踏車\n為什麼小明沒有開冰箱就知道冰箱裡有螞蟻\n因為冰箱外停著螞蟻的腳踏車',
  '把外勞關在家猜一個地名\n索馬利亞',
  '在學校，教官要找李鴻毅\n但是教官不知道他是哪一班的\n於是他就找個學生問\n「李鴻毅幾班？」\n學生「逮金？」\n\n(日本冷氣品牌，大金廣告詞 : 日本一級棒大金 ! )\nhttps://www.youtube.com/watch?v=izmg1bOYkDE',
  '樹長到超過一千年稱之為千年神木\n那超過千年的呢？\n超齡老木',
  '有一天Y跟X走在路上，突然看到U哭得很傷心，Y就走過去問U說：\n\nuniqlo',
  '小美走在路上遇到一隻兇殘的大烏龜把她攔了下來，\n小美就說:你要劫財還是劫色我都給你拜託饒我一命!\n結果你知道那隻烏龜說了什麼嗎?\n\n「傑尼傑尼」',
  '有一天軟糖難過的哭了\n然後他就變成QQ軟糖了',
  '有天醫生跟小明說：很抱歉得告訴你一個壞消息.\n你不能打手槍了\n小明：為什麼ㄚㄚㄚㄚㄚ\n醫生：因為你他媽現在在看診',
  '有一對情侶吵架\n女生就很生氣的奪門而出\n然後男生就很快速的跑出去\n把門奪回來....',
  '有一天瞎子跟瘸子相約去騎車，\n瞎子騎車瘸子看路，騎到一半瘸子突然看到前面有個大深溝，\n他就對瞎子大喊：溝溝溝，\n瞎子回他：啊勒啊勒啊勒，\n然後兩人一起掉入深溝中....\n\n(瑞奇馬汀的經典名曲 : La Copa de la Vida)\nhttps://www.youtube.com/watch?v=8BkYKwHLXiU',
  '你知道嗎，在非洲不用手機也可以玩部落衝突',
  '有一天洗衣和洗褲要出去逛街只剩下洗襪一個人在家，\n洗衣和洗褲出門前家裡有一駝大便，\n但是回來後大便卻不見了，\n猜是把大便吃掉了?\n回答說：「洗襪！」台語【是我】',
  '奴隸不能做什麼事情？\n\nA : 煎蛋 ( 修煉愛情的悲歡~我們這些奴隸不煎蛋)\n(林俊傑，修練愛情)',
  '平地的貓咪都會喵喵叫，那山上的貓呢?\n\nA : 喵的拉',
  '為什麼小智去看車時，業務會被電死？\n業務 : 請問您的預算和廠牌?\n小智 : 10萬，福特 !',
  '面試官 : 如果把自己比喻為一種動物，你會是哪一種?\n小明 : 鸚鵡\n面試官 : 喔? 為什麼是鸚鵡呢?\n小明 : 喔? 為什麼是鸚鵡呢?\n面試官 : ......',
  '有一天，牧場的主人對他養的牛說:\n今天，你就自己擠牛奶吧!\n牛就回他說 : 我真是自取其乳(辱)阿 !',
  '有一天，小明去夜市吃臭豆腐\n小明 : 老闆，這臭豆腐怎麼那麼軟?\n老闆 : 因為你沒認真吃啊 ! 認真就酥(輸)了 !',
  '皮卡丘走路怎麼說 ?\nA : 兵乓乒乓乒乓乒乓乒乓\n(丘為皮卡丘的身體，乒乓很像左右腳走路的樣子)',
  '一條褲子可以穿20年，猜一地名 (日本)\n\nA : 神奈川\n(神耐穿)',
  '什麼人最容易被綁架 ? \n\nA : 模範生，因為他們都是好榜樣~\n(好綁樣)',
  '麵包超人扭到腳會變成什麼 ? \n\nA : 牛角麵包 (扭腳麵包)',
  '有天小華到天庭跟眾仙開會\n小華 : 玉皇大帝，千手觀音為什麼還沒到呢 ?\n\n玉皇大帝 : 因為她還在洗手...'
]

const getData = async () => {
  axios
    .get('https://gis.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json')
    .then(response => {
      data = response.data.XML_Head.Infos.Info
    })
    .catch(error => {
      console.log(error)
      console.log('getData錯誤')
    })
}
// 每日 0 點定時更新資料
schedule.scheduleJob('* * 0 * *', getData)
// 機器人啟動時也要有資料
getData()

dotenv.config()
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.listen('/', process.env.PORT, () => {
  console.log('機器人啟動')
})

// 經緯度距離
function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0
  } else {
    let radlat1 = (Math.PI * lat1) / 180
    let radlat2 = (Math.PI * lat2) / 180
    let theta = lon1 - lon2
    let radtheta = (Math.PI * theta) / 180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    if (unit === 'K') {
      dist = dist * 1.609344
    }
    if (unit === 'N') {
      dist = dist * 0.8684
    }
    return dist
  }
}

const region = [
  {
    area: '北部地區',
    district: ['臺北市', '新北市', '基隆市', '桃園市', '新竹市', '新竹縣', '苗栗縣'],
    // 紫
    color: '#F9E54E'
  },
  {
    area: '中部地區',
    district: ['臺中市', '彰化市', '南投縣'],
    // 綠
    color: '#E12E4B'
  },
  {
    area: '南部地區',
    district: ['雲林縣', '嘉義市', '嘉義縣', '臺南市', '高雄市', '屏東縣'],
    // 橘
    color: '#F8981D'
  },
  {
    area: '東部地區',
    district: ['宜蘭縣', '花蓮縣', '臺東縣'],
    // 黃
    color: '#5BBDC8'
  }
]

bot.on('message', async event => {
  if (event.message.type === 'location') {
    try {
      console.log(event.message)
      const result = data.filter(d => {
        return d.Name !== '' && d.Add !== ''
      })
      const reply = {
        type: 'flex',
        altText: '附近景點推薦',
        contents: {
          type: 'carousel',
          contents: []
        }
      }
      const newdata = []
      const dataidx = []
      let number = 0
      for (const d of result) {
        const distan = distance(event.message.latitude, event.message.longitude, d.Py, d.Px, 'K')
        if (distan <= 5) {
          newdata.push(d)
        }
      }
      console.log('a')
      for (let i = 0; i < 5; i++) {
        if (newdata.length !== 0) {
          let rand = Math.round(Math.random() * (newdata.length - 1))
          if (dataidx.includes(rand)) {
            i--
          } else {
            dataidx.push(rand)
          }
        }
      }
      console.log('b')
      if (newdata.length === 0) {
        console.log('c')
        event.reply('兄弟 你附近是荒野嗎\n我找地圖找了好久沒有景點呀！')
      } else {
        console.log('e')
        for (const n of newdata) {
          for (let i of dataidx) {
            const distan = distance(event.message.latitude, event.message.longitude, n.Py, n.Px, 'K')
            if (number === i) {
              reply.contents.contents.push({
                type: 'bubble',
                size: 'micro',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: `${n.Name}`,
                          size: 'md',
                          adjustMode: 'shrink-to-fit',
                          weight: 'bold',
                          wrap: true
                        }
                      ],
                      paddingBottom: '2px'
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'box',
                          layout: 'horizontal',
                          contents: [
                            {
                              type: 'box',
                              layout: 'vertical',
                              contents: [
                                {
                                  type: 'text',
                                  text: '距離目前位置',
                                  size: 'xxs'
                                }
                              ],
                              width: '95px'
                            },
                            {
                              type: 'box',
                              layout: 'vertical',
                              contents: [
                                {
                                  type: 'text',
                                  text: `${distan.toFixed(2)}K`,
                                  size: 'xs',
                                  wrap: true
                                }
                              ],
                              alignItems: 'flex-end',
                              width: '45px'
                            }
                          ],
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }
                      ]
                    },
                    {
                      type: 'separator',
                      margin: '5px'
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: `${n.Add}`,
                          size: 'xs',
                          wrap: true
                        }
                      ],
                      paddingTop: '5px'
                    }
                  ]
                },
                footer: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: '地點介紹',
                          align: 'center',
                          size: 'xs',
                          color: '#ffffff',
                          weight: 'bold'
                        }
                      ],
                      backgroundColor: '#CC9966',
                      cornerRadius: '5px',
                      alignItems: 'center',
                      height: '25px',
                      justifyContent: 'center',
                      width: '80px',
                      action: {
                        type: 'postback',
                        label: `${n.Name}地點介紹`,
                        data: `${n.Name}地點介紹`
                      }
                    }
                  ],
                  alignItems: 'center'
                }
              })
            }
          }
          number++
        }
        console.log('f')
        if (newdata.length === 5) {
          event.reply(['哇 你很幸運！\n方圓5公里內剛好就這5個點\n快跟著我一起沖鴨～～～', reply])
        } else {
          event.reply(['5公里內的景點太多了\n就推薦你幾個自己看吧\n\n不喜歡這些的話就再跟我說一次位置\n破例再幫你找一次！', reply])
        }
      }
    } catch (error) {
      event.reply('不要傳奇怪的地方鴨！我會錯亂！')
    }
  }
  if (event.message.type === 'text') {
    if (
      event.message.text === '那幫我找找有什麼景點' ||
      event.message.text === '景點' ||
      event.message.text === '我想找景點' ||
      event.message.text === '我要找景點' ||
      event.message.text === '幫我找景點' ||
      event.message.text === '找景點' ||
      event.message.text === '來找景點鴨'
    ) {
      try {
        let reply = {
          type: 'flex',
          altText: 'flex',
          contents: {
            type: 'bubble',
            size: 'mega',
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '想去哪個區域呢',
                      size: 'md',
                      align: 'center',
                      weight: 'bold'
                    },
                    {
                      type: 'text',
                      text: '點擊區域選項開啟縣市選單',
                      size: 'xs',
                      color: '#999999',
                      align: 'center',
                      margin: 'sm'
                    }
                  ]
                },
                {
                  type: 'separator',
                  margin: '4px'
                },
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'box',
                          layout: 'horizontal',
                          contents: [
                            {
                              type: 'box',
                              layout: 'vertical',
                              contents: [],
                              backgroundColor: `${region[0].color}`,
                              width: '9px',
                              height: '9px',
                              margin: 'xl',
                              cornerRadius: '9px',
                              offsetStart: '5px'
                            },
                            {
                              type: 'box',
                              layout: 'vertical',
                              contents: [
                                {
                                  type: 'text',
                                  text: '北部地區',
                                  size: 'sm',
                                  weight: 'bold',
                                  offsetStart: '5px'
                                }
                              ],
                              flex: 1,
                              offsetStart: '10px'
                            }
                          ],
                          alignItems: 'center'
                        }
                      ],
                      flex: 1,
                      action: {
                        type: 'postback',
                        label: 'action',
                        data: '北部地區'
                      }
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'box',
                          layout: 'horizontal',
                          contents: [
                            {
                              type: 'box',
                              layout: 'vertical',
                              contents: [],
                              backgroundColor: `${region[1].color}`,
                              width: '9px',
                              height: '9px',
                              margin: 'xl',
                              cornerRadius: '9px',
                              offsetStart: '5px'
                            },
                            {
                              type: 'box',
                              layout: 'vertical',
                              contents: [
                                {
                                  type: 'text',
                                  text: '中部地區',
                                  size: 'sm',
                                  weight: 'bold',
                                  offsetStart: '5px'
                                }
                              ],
                              flex: 1,
                              offsetStart: '10px'
                            }
                          ],
                          alignItems: 'center'
                        }
                      ],
                      flex: 1,
                      action: {
                        type: 'postback',
                        label: 'action',
                        data: '中部地區'
                      }
                    }
                  ],
                  margin: 'lg'
                },
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'box',
                          layout: 'horizontal',
                          contents: [
                            {
                              type: 'box',
                              layout: 'vertical',
                              contents: [],
                              backgroundColor: `${region[2].color}`,
                              width: '9px',
                              height: '9px',
                              margin: 'xl',
                              cornerRadius: '9px',
                              offsetStart: '5px'
                            },
                            {
                              type: 'box',
                              layout: 'vertical',
                              contents: [
                                {
                                  type: 'text',
                                  text: '南部地區',
                                  size: 'sm',
                                  weight: 'bold',
                                  offsetStart: '5px'
                                }
                              ],
                              flex: 1,
                              offsetStart: '10px'
                            }
                          ],
                          alignItems: 'center'
                        }
                      ],
                      flex: 1,
                      action: {
                        type: 'postback',
                        label: 'action',
                        data: '南部地區'
                      }
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'box',
                          layout: 'horizontal',
                          contents: [
                            {
                              type: 'box',
                              layout: 'vertical',
                              contents: [],
                              backgroundColor: `${region[3].color}`,
                              width: '9px',
                              height: '9px',
                              margin: 'xl',
                              cornerRadius: '9px',
                              offsetStart: '5px'
                            },
                            {
                              type: 'box',
                              layout: 'vertical',
                              contents: [
                                {
                                  type: 'text',
                                  text: '東部地區',
                                  size: 'sm',
                                  weight: 'bold',
                                  offsetStart: '5px'
                                }
                              ],
                              flex: 1,
                              offsetStart: '10px'
                            }
                          ],
                          alignItems: 'center'
                        }
                      ],
                      flex: 1,
                      action: {
                        type: 'postback',
                        label: 'action',
                        data: '東部地區'
                      }
                    }
                  ],
                  margin: 'lg'
                }
              ]
            }
          }
        }
        event.reply(reply)
      } catch (error) {
        event.reply('我的腦波發生錯誤了，幫我叫醫生好嗎？')
      }
    } else if (event.message.text === '問附近' || event.message.text === '來問附近鴨' || event.message.text === '附近') {
      try {
        event.reply({
          type: 'text',
          text: '兄弟 先告訴我你在哪吧！',
          quickReply: {
            items: [
              {
                type: 'action',
                action: {
                  type: 'location',
                  label: '傳送目前位置找附近景點'
                }
              }
            ]
          }
        })
      } catch (error) {
        event.reply('我的腦波發生錯誤了，幫我叫醫生好嗎？')
      }
    } else if (event.message.text === '講笑話' || event.message.text === '來講笑話鴨' || event.message.text === '笑話' || event.message.text === '娛樂我') {
      try {
        let rand = Math.round(Math.random() * (joke.length - 1))

        event.reply(joke[rand])
      } catch (error) {
        event.reply('我的腦波發生錯誤了，幫我叫醫生好嗎？')
      }
    } else if (
      event.message.text === '北部地區' ||
      event.message.text === '中部地區' ||
      event.message.text === '南部地區' ||
      event.message.text === '東部地區'
    ) {
      try {
        let result = region.filter(data => {
          return data.area === event.message.text
        })
        let num = 1
        const color = result[0].color
        const area = result[0].area
        let city = result[0].district

        const reply = {
          type: 'flex',
          altText: `${area}`,
          contents: {
            type: 'bubble',
            body: {
              type: 'box',
              layout: 'vertical',
              spacing: 'md',
              contents: [
                {
                  type: 'text',
                  text: `${area}`,
                  size: 'md',
                  weight: 'bold',
                  align: 'center'
                },
                {
                  type: 'text',
                  text: '點擊縣市選項開啟功能搜尋',
                  size: 'xs',
                  color: '#999999',
                  align: 'center',
                  margin: 'sm'
                },
                {
                  type: 'separator'
                }
              ]
            }
          }
        }
        for (let i = 0; i < city.length / 2; i++) {
          if (city.length % 2 === 0) {
            const district = {
              type: 'box',
              layout: 'horizontal',
              spacing: 'sm',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'horizontal',
                      contents: [
                        {
                          type: 'box',
                          layout: 'vertical',
                          contents: [
                            {
                              type: 'text',
                              text: `${num}`,
                              flex: 0,
                              align: 'center',
                              size: 'xxs',
                              color: '#ffffff',
                              offsetTop: '1px'
                            }
                          ],
                          backgroundColor: `${color}`,
                          cornerRadius: '3px',
                          margin: 'xl',
                          width: '18px',
                          height: '18px'
                        },
                        {
                          type: 'box',
                          layout: 'horizontal',
                          contents: [
                            {
                              type: 'text',
                              text: `${city[num - 1]}`,
                              weight: 'bold',
                              margin: 'sm',
                              flex: 0,
                              wrap: true,
                              maxLines: 2,
                              size: 'sm'
                            }
                          ],
                          paddingStart: '5px',
                          flex: 0
                        }
                      ]
                    }
                  ],
                  paddingBottom: '5px',
                  width: '50%',
                  flex: 1,
                  action: {
                    type: 'postback',
                    label: 'action',
                    data: `${city[num - 1]}`
                  }
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'horizontal',
                      contents: [
                        {
                          type: 'box',
                          layout: 'vertical',
                          contents: [
                            {
                              type: 'text',
                              text: `${num + 1}`,
                              flex: 0,
                              align: 'center',
                              size: 'xxs',
                              color: '#ffffff',
                              offsetTop: '1px'
                            }
                          ],
                          backgroundColor: `${color}`,
                          cornerRadius: '3px',
                          margin: 'xl',
                          width: '18px',
                          height: '18px'
                        },
                        {
                          type: 'box',
                          layout: 'horizontal',
                          contents: [
                            {
                              type: 'text',
                              text: `${city[num]}`,
                              weight: 'bold',
                              margin: 'sm',
                              flex: 0,
                              wrap: true,
                              maxLines: 2,
                              size: 'sm'
                            }
                          ],
                          paddingStart: '5px',
                          flex: 0
                        }
                      ]
                    }
                  ],
                  paddingBottom: '5px',
                  width: '50%',
                  flex: 1,
                  action: {
                    type: 'postback',
                    label: 'action',
                    data: `${city[num]}`
                  }
                }
              ],
              offsetStart: '-2px'
            }
            reply.contents.body.contents.push(district)
          } else {
            if (i + 0.5 == city.length / 2) {
              const district = {
                type: 'box',
                layout: 'horizontal',
                spacing: 'sm',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'box',
                            layout: 'vertical',
                            contents: [
                              {
                                type: 'text',
                                text: `${num}`,
                                flex: 0,
                                align: 'center',
                                size: 'xxs',
                                color: '#ffffff',
                                offsetTop: '1px'
                              }
                            ],
                            backgroundColor: `${color}`,
                            cornerRadius: '3px',
                            margin: 'xl',
                            width: '18px',
                            height: '18px'
                          },
                          {
                            type: 'box',
                            layout: 'horizontal',
                            contents: [
                              {
                                type: 'text',
                                text: `${city[num - 1]}`,
                                weight: 'bold',
                                margin: 'sm',
                                flex: 0,
                                wrap: true,
                                maxLines: 2,
                                size: 'sm'
                              }
                            ],
                            paddingStart: '5px',
                            flex: 0
                          }
                        ]
                      }
                    ],
                    paddingBottom: '5px',
                    width: '50%',
                    flex: 1,
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: `${city[num - 1]}`
                    }
                  }
                ],
                offsetStart: '-2px'
              }
              reply.contents.body.contents.push(district)
            } else {
              const district = {
                type: 'box',
                layout: 'horizontal',
                spacing: 'sm',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'box',
                            layout: 'vertical',
                            contents: [
                              {
                                type: 'text',
                                text: `${num}`,
                                flex: 0,
                                align: 'center',
                                size: 'xxs',
                                color: '#ffffff',
                                offsetTop: '1px'
                              }
                            ],
                            backgroundColor: `${color}`,
                            cornerRadius: '3px',
                            margin: 'xl',
                            width: '18px',
                            height: '18px'
                          },
                          {
                            type: 'box',
                            layout: 'horizontal',
                            contents: [
                              {
                                type: 'text',
                                text: `${city[num - 1]}`,
                                weight: 'bold',
                                margin: 'sm',
                                flex: 0,
                                wrap: true,
                                maxLines: 2,
                                size: 'sm'
                              }
                            ],
                            paddingStart: '5px',
                            flex: 0
                          }
                        ]
                      }
                    ],
                    paddingBottom: '5px',
                    width: '50%',
                    flex: 1,
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: `${city[num - 1]}`
                    }
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'box',
                            layout: 'vertical',
                            contents: [
                              {
                                type: 'text',
                                text: `${num + 1}`,
                                flex: 0,
                                align: 'center',
                                size: 'xxs',
                                color: '#ffffff',
                                offsetTop: '1px'
                              }
                            ],
                            backgroundColor: `${color}`,
                            cornerRadius: '3px',
                            margin: 'xl',
                            width: '18px',
                            height: '18px'
                          },
                          {
                            type: 'box',
                            layout: 'horizontal',
                            contents: [
                              {
                                type: 'text',
                                text: `${city[num]}`,
                                weight: 'bold',
                                margin: 'sm',
                                flex: 0,
                                wrap: true,
                                maxLines: 2,
                                size: 'sm'
                              }
                            ],
                            paddingStart: '5px',
                            flex: 0
                          }
                        ]
                      }
                    ],
                    paddingBottom: '5px',
                    width: '50%',
                    flex: 1,
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: `${city[num]}`
                    }
                  }
                ],
                offsetStart: '-2px'
              }
              reply.contents.body.contents.push(district)
            }
          }
          num += 2
        }

        event.reply(reply)
      } catch (error) {
        event.reply('我的腦波發生錯誤了，幫我叫醫生好嗎？')
      }
    } else if (
      event.message.text === '臺北市' ||
      event.message.text === '新北市' ||
      event.message.text === '基隆市' ||
      event.message.text === '桃園市' ||
      event.message.text === '新竹市' ||
      event.message.text === '新竹縣' ||
      event.message.text === '苗栗縣' ||
      event.message.text === '臺中市' ||
      event.message.text === '彰化市' ||
      event.message.text === '南投縣' ||
      event.message.text === '雲林縣' ||
      event.message.text === '嘉義市' ||
      event.message.text === '嘉義縣' ||
      event.message.text === '臺南市' ||
      event.message.text === '高雄市' ||
      event.message.text === '屏東縣' ||
      event.message.text === '宜蘭縣' ||
      event.message.text === '花蓮縣' ||
      event.message.text === '臺東縣'
    ) {
      try {
        const city = event.message.text
        const reply2 = {
          type: 'flex',
          altText: '景點搜尋功能',
          contents: {
            type: 'carousel',
            contents: [
              {
                type: 'bubble',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '私房路線',
                      color: '#745F4C',
                      align: 'start',
                      size: 'md',
                      gravity: 'center',
                      weight: 'bold'
                    },
                    {
                      type: 'text',
                      text: '熱門路線讓你玩',
                      color: '#745F4C',
                      align: 'start',
                      size: 'xs',
                      gravity: 'center',
                      margin: 'lg'
                    }
                  ],
                  backgroundColor: '#FFCF48',
                  paddingTop: '19px',
                  paddingAll: '12px',
                  paddingBottom: '16px',
                  action: {
                    type: 'postback',
                    label: 'action',
                    data: `${city}私房路線`
                  }
                },
                size: 'nano',
                styles: {
                  footer: {
                    separator: false
                  }
                }
              },
              {
                type: 'bubble',
                size: 'nano',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '隨機推薦',
                      color: '#745F4C',
                      align: 'start',
                      size: 'md',
                      gravity: 'center',
                      weight: 'bold'
                    },
                    {
                      type: 'text',
                      text: '選擇障礙請選我',
                      color: '#745F4C',
                      align: 'start',
                      size: 'xs',
                      gravity: 'center',
                      margin: 'lg'
                    }
                  ],
                  backgroundColor: '#FBE68B',
                  paddingTop: '19px',
                  paddingAll: '12px',
                  paddingBottom: '16px',
                  action: {
                    type: 'postback',
                    label: 'action',
                    data: `${city}隨機推薦`
                  }
                },
                styles: {
                  footer: {
                    separator: false
                  }
                }
              },
              {
                type: 'bubble',
                size: 'nano',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '全部景點',
                      color: '#ffffff',
                      align: 'start',
                      size: 'md',
                      gravity: 'center',
                      weight: 'bold'
                    },
                    {
                      type: 'text',
                      text: '真的很多慢慢看',
                      color: '#ffffff',
                      align: 'start',
                      size: 'xs',
                      gravity: 'center',
                      margin: 'lg'
                    }
                  ],
                  backgroundColor: '#CFAE8F',
                  paddingTop: '19px',
                  paddingAll: '12px',
                  paddingBottom: '16px',
                  action: {
                    type: 'postback',
                    label: 'action',
                    data: `${city}全部景點`
                  }
                },
                styles: {
                  footer: {
                    separator: false
                  }
                }
              },
              {
                type: 'bubble',
                size: 'nano',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '離我最近',
                      color: '#ffffff',
                      align: 'start',
                      size: 'md',
                      gravity: 'center',
                      weight: 'bold'
                    },
                    {
                      type: 'text',
                      text: '附近景點交給我',
                      color: '#ffffff',
                      align: 'start',
                      size: 'xs',
                      gravity: 'center',
                      margin: 'lg'
                    }
                  ],
                  backgroundColor: '#CC9966',
                  paddingTop: '19px',
                  paddingAll: '12px',
                  paddingBottom: '16px',
                  action: {
                    type: 'postback',
                    label: 'action',
                    data: `${city}離我最近`
                  }
                },
                styles: {
                  footer: {
                    separator: false
                  }
                }
              }
            ]
          }
        }
        event.reply(reply2)
      } catch (error) {
        event.reply('我的腦波發生錯誤了，幫我叫醫生好嗎？')
      }
    } else {
      try {
        event.reply({
          type: 'text',
          text: '我可是踏遍全台的旅遊鴨\n想找景點找我就對了！\n\n說明書：\n1. 輸入景點／找景點／幫我找景點\n2. 傳送目前位置訊息查附近景點\n（此功能僅支援手機版）\n3. 輸入講笑話／笑話／娛樂我',
          quickReply: {
            items: [
              {
                type: 'action',
                action: {
                  type: 'message',
                  label: '那幫我找找有什麼景點',
                  text: '那幫我找找有什麼景點'
                }
              },
              {
                type: 'action',
                action: {
                  type: 'location',
                  label: '傳送目前位置找附近景點'
                }
              }
            ]
          }
        })
      } catch (error) {
        event.reply('我的腦波發生錯誤了，幫我叫醫生好嗎？')
      }
    }
  }
})

bot.on('postback', async event => {
  for (const r of region) {
    if (event.postback.data.includes(r.area)) {
      try {
        let num = 1
        const reply = {
          type: 'flex',
          altText: `${r.area}`,
          contents: {
            type: 'bubble',
            body: {
              type: 'box',
              layout: 'vertical',
              spacing: 'md',
              contents: [
                {
                  type: 'text',
                  text: `${r.area}`,
                  size: 'md',
                  weight: 'bold',
                  align: 'center'
                },
                {
                  type: 'text',
                  text: '點擊縣市選項開啟功能搜尋',
                  size: 'xs',
                  color: '#999999',
                  align: 'center',
                  margin: 'sm'
                },
                {
                  type: 'separator'
                }
              ]
            }
          }
        }
        for (let i = 0; i < r.district.length / 2; i++) {
          if (r.district.length % 2 === 0) {
            const district = {
              type: 'box',
              layout: 'horizontal',
              spacing: 'sm',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'horizontal',
                      contents: [
                        {
                          type: 'box',
                          layout: 'vertical',
                          contents: [
                            {
                              type: 'text',
                              text: `${num}`,
                              flex: 0,
                              align: 'center',
                              size: 'xxs',
                              color: '#ffffff',
                              offsetTop: '1px'
                            }
                          ],
                          backgroundColor: `${r.color}`,
                          cornerRadius: '3px',
                          margin: 'xl',
                          width: '18px',
                          height: '18px'
                        },
                        {
                          type: 'box',
                          layout: 'horizontal',
                          contents: [
                            {
                              type: 'text',
                              text: `${r.district[num - 1]}`,
                              weight: 'bold',
                              margin: 'sm',
                              flex: 0,
                              wrap: true,
                              maxLines: 2,
                              size: 'sm'
                            }
                          ],
                          paddingStart: '5px',
                          flex: 0
                        }
                      ]
                    }
                  ],
                  paddingBottom: '5px',
                  width: '50%',
                  flex: 1,
                  action: {
                    type: 'postback',
                    label: 'action',
                    data: `${r.district[num - 1]}`
                  }
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'horizontal',
                      contents: [
                        {
                          type: 'box',
                          layout: 'vertical',
                          contents: [
                            {
                              type: 'text',
                              text: `${num + 1}`,
                              flex: 0,
                              align: 'center',
                              size: 'xxs',
                              color: '#ffffff',
                              offsetTop: '1px'
                            }
                          ],
                          backgroundColor: `${r.color}`,
                          cornerRadius: '3px',
                          margin: 'xl',
                          width: '18px',
                          height: '18px'
                        },
                        {
                          type: 'box',
                          layout: 'horizontal',
                          contents: [
                            {
                              type: 'text',
                              text: `${r.district[num]}`,
                              weight: 'bold',
                              margin: 'sm',
                              flex: 0,
                              wrap: true,
                              maxLines: 2,
                              size: 'sm'
                            }
                          ],
                          paddingStart: '5px',
                          flex: 0
                        }
                      ]
                    }
                  ],
                  paddingBottom: '5px',
                  width: '50%',
                  flex: 1,
                  action: {
                    type: 'postback',
                    label: 'action',
                    data: `${r.district[num]}`
                  }
                }
              ],
              offsetStart: '-2px'
            }
            reply.contents.body.contents.push(district)
          } else {
            if (i + 0.5 == r.district.length / 2) {
              const district = {
                type: 'box',
                layout: 'horizontal',
                spacing: 'sm',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'box',
                            layout: 'vertical',
                            contents: [
                              {
                                type: 'text',
                                text: `${num}`,
                                flex: 0,
                                align: 'center',
                                size: 'xxs',
                                color: '#ffffff',
                                offsetTop: '1px'
                              }
                            ],
                            backgroundColor: `${r.color}`,
                            cornerRadius: '3px',
                            margin: 'xl',
                            width: '18px',
                            height: '18px'
                          },
                          {
                            type: 'box',
                            layout: 'horizontal',
                            contents: [
                              {
                                type: 'text',
                                text: `${r.district[num - 1]}`,
                                weight: 'bold',
                                margin: 'sm',
                                flex: 0,
                                wrap: true,
                                maxLines: 2,
                                size: 'sm'
                              }
                            ],
                            paddingStart: '5px',
                            flex: 0
                          }
                        ]
                      }
                    ],
                    paddingBottom: '5px',
                    width: '50%',
                    flex: 1,
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: `${r.district[num - 1]}`
                    }
                  }
                ],
                offsetStart: '-2px'
              }
              reply.contents.body.contents.push(district)
            } else {
              const district = {
                type: 'box',
                layout: 'horizontal',
                spacing: 'sm',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'box',
                            layout: 'vertical',
                            contents: [
                              {
                                type: 'text',
                                text: `${num}`,
                                flex: 0,
                                align: 'center',
                                size: 'xxs',
                                color: '#ffffff',
                                offsetTop: '1px'
                              }
                            ],
                            backgroundColor: `${r.color}`,
                            cornerRadius: '3px',
                            margin: 'xl',
                            width: '18px',
                            height: '18px'
                          },
                          {
                            type: 'box',
                            layout: 'horizontal',
                            contents: [
                              {
                                type: 'text',
                                text: `${r.district[num - 1]}`,
                                weight: 'bold',
                                margin: 'sm',
                                flex: 0,
                                wrap: true,
                                maxLines: 2,
                                size: 'sm'
                              }
                            ],
                            paddingStart: '5px',
                            flex: 0
                          }
                        ]
                      }
                    ],
                    paddingBottom: '5px',
                    width: '50%',
                    flex: 1,
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: `${r.district[num - 1]}`
                    }
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'box',
                            layout: 'vertical',
                            contents: [
                              {
                                type: 'text',
                                text: `${num + 1}`,
                                flex: 0,
                                align: 'center',
                                size: 'xxs',
                                color: '#ffffff',
                                offsetTop: '1px'
                              }
                            ],
                            backgroundColor: `${r.color}`,
                            cornerRadius: '3px',
                            margin: 'xl',
                            width: '18px',
                            height: '18px'
                          },
                          {
                            type: 'box',
                            layout: 'horizontal',
                            contents: [
                              {
                                type: 'text',
                                text: `${r.district[num]}`,
                                weight: 'bold',
                                margin: 'sm',
                                flex: 0,
                                wrap: true,
                                maxLines: 2,
                                size: 'sm'
                              }
                            ],
                            paddingStart: '5px',
                            flex: 0
                          }
                        ]
                      }
                    ],
                    paddingBottom: '5px',
                    width: '50%',
                    flex: 1,
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: `${r.district[num]}`
                    }
                  }
                ],
                offsetStart: '-2px'
              }
              reply.contents.body.contents.push(district)
            }
          }
          num += 2
        }

        event.reply(reply)
      } catch (error) {
        event.reply('我的腦波發生錯誤了，幫我叫醫生好嗎？')
      }
    }
    for (const rr of r.district) {
      if (event.postback.data === rr) {
        try {
          const reply2 = {
            type: 'flex',
            altText: '景點搜尋功能',
            contents: {
              type: 'carousel',
              contents: [
                {
                  type: 'bubble',
                  body: {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: '私房路線',
                        color: '#745F4C',
                        align: 'start',
                        size: 'md',
                        gravity: 'center',
                        weight: 'bold'
                      },
                      {
                        type: 'text',
                        text: '熱門路線讓你玩',
                        color: '#745F4C',
                        align: 'start',
                        size: 'xs',
                        gravity: 'center',
                        margin: 'lg'
                      }
                    ],
                    backgroundColor: '#FFCF48',
                    paddingTop: '19px',
                    paddingAll: '12px',
                    paddingBottom: '16px',
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: `${rr}私房路線`
                    }
                  },
                  size: 'nano',
                  styles: {
                    footer: {
                      separator: false
                    }
                  }
                },
                {
                  type: 'bubble',
                  size: 'nano',
                  body: {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: '隨機推薦',
                        color: '#745F4C',
                        align: 'start',
                        size: 'md',
                        gravity: 'center',
                        weight: 'bold'
                      },
                      {
                        type: 'text',
                        text: '選擇障礙請選我',
                        color: '#745F4C',
                        align: 'start',
                        size: 'xs',
                        gravity: 'center',
                        margin: 'lg'
                      }
                    ],
                    backgroundColor: '#FBE68B',
                    paddingTop: '19px',
                    paddingAll: '12px',
                    paddingBottom: '16px',
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: `${rr}隨機推薦`
                    }
                  },
                  styles: {
                    footer: {
                      separator: false
                    }
                  }
                },
                {
                  type: 'bubble',
                  size: 'nano',
                  body: {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: '全部景點',
                        color: '#ffffff',
                        align: 'start',
                        size: 'md',
                        gravity: 'center',
                        weight: 'bold'
                      },
                      {
                        type: 'text',
                        text: '真的很多慢慢看',
                        color: '#ffffff',
                        align: 'start',
                        size: 'xs',
                        gravity: 'center',
                        margin: 'lg'
                      }
                    ],
                    backgroundColor: '#CFAE8F',
                    paddingTop: '19px',
                    paddingAll: '12px',
                    paddingBottom: '16px',
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: `${rr}全部景點`
                    }
                  },
                  styles: {
                    footer: {
                      separator: false
                    }
                  }
                },
                {
                  type: 'bubble',
                  size: 'nano',
                  body: {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: '離我最近',
                        color: '#ffffff',
                        align: 'start',
                        size: 'md',
                        gravity: 'center',
                        weight: 'bold'
                      },
                      {
                        type: 'text',
                        text: '附近景點交給我',
                        color: '#ffffff',
                        align: 'start',
                        size: 'xs',
                        gravity: 'center',
                        margin: 'lg'
                      }
                    ],
                    backgroundColor: '#CC9966',
                    paddingTop: '19px',
                    paddingAll: '12px',
                    paddingBottom: '16px',
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: `${rr}離我最近`
                    }
                  },
                  styles: {
                    footer: {
                      separator: false
                    }
                  }
                }
              ]
            }
          }
          event.reply(reply2)
        } catch (error) {
          event.reply('我的腦波發生錯誤了，幫我叫醫生好嗎？')
        }
      }
      if (event.postback.data.includes(rr) && event.postback.data.includes('私房路線')) {
        try {
          const result = data.filter(d => {
            return d.Add.includes(rr) && d.Name !== '' && d.Add !== ''
          })
          const dataidx = []
          for (let i = 0; i < 5; i++) {
            let rand = Math.round(Math.random() * (result.length - 1))
            if (dataidx.includes(rand)) {
              i--
            } else {
              dataidx.push(rand)
            }
          }
          const newidx = dataidx.sort((a, b) => {
            return a - b
          })
          let number = 0
          const reply = {
            type: 'flex',
            altText: `${rr}私房路線`,
            contents: {
              type: 'bubble',
              size: 'mega',
              header: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: `私房路線`,
                        color: '#745F4C',
                        size: 'sm'
                      },
                      {
                        type: 'text',
                        text: `${rr}街區小旅行`,
                        color: '#ffffff',
                        size: 'lg',
                        flex: 4,
                        weight: 'bold',
                        margin: '1px'
                      },
                      {
                        type: 'text',
                        text: '金夏限定小旅行',
                        size: 'xs',
                        color: '#745F4C',
                        margin: 'sm'
                      }
                    ]
                  }
                ],
                backgroundColor: '#FFCF48',
                spacing: 'md',
                height: '96px'
              },
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: `預計旅行時間: ${Math.round(Math.random() * 4 + 2)} 小時`,
                    size: 'xs',
                    color: '#8c8c8c'
                  }
                ]
              }
            }
          }

          for (let d of result) {
            let Org = d.Orgclass
            let description = d.Description
            if (d.Orgclass === '' || d.Orgclass == null) {
              Org = '景點'
            }
            if (d.Orgclass === '觀光工廠') {
              Org = '觀光\n工廠'
            } else if (d.Orgclass === '海岸風情') {
              Org = '海岸\n風情'
            } else if (d.Orgclass === '公園遊憩') {
              Org = '公園\n遊憩'
            } else if (d.Orgclass === '綠野森呼吸') {
              Org = '綠野\n呼吸'
            } else if (d.Orgclass === '親子同遊') {
              Org = '親子\n同遊'
            } else if (d.Orgclass === '老街巡禮') {
              Org = '老街\n巡禮'
            } else if (d.Orgclass === '單車漫遊') {
              Org = '單車\n漫遊'
            } else if (d.Orgclass === '展覽博物') {
              Org = '展覽\n博物'
            } else if (d.Orgclass === '鐵道懷舊') {
              Org = '鐵道\n懷舊'
            }
            if (d.Description === null || d.Description === '') {
              description = d.Toldescribe
            }
            if (number === newidx[0]) {
              reply.contents.body.contents.push({
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'box',
                    layout: 'horizontal',
                    contents: [
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            size: 'xs',
                            gravity: 'center',
                            text: `${Org}`,
                            adjustMode: 'shrink-to-fit',
                            wrap: true,
                            maxLines: 2
                          }
                        ],
                        spacing: 'lg',
                        paddingTop: '4px',
                        width: '48px'
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'box',
                            layout: 'horizontal',
                            contents: [
                              {
                                type: 'box',
                                layout: 'vertical',
                                contents: [
                                  {
                                    type: 'filler'
                                  },
                                  {
                                    type: 'box',
                                    layout: 'vertical',
                                    contents: [],
                                    cornerRadius: '30px',
                                    height: '12px',
                                    width: '12px',
                                    borderColor: '#ffcf3d',
                                    borderWidth: '2px',
                                    backgroundColor: '#ffcf3d'
                                  },
                                  {
                                    type: 'filler'
                                  }
                                ],
                                flex: 0
                              },
                              {
                                type: 'box',
                                layout: 'vertical',
                                contents: [
                                  {
                                    type: 'text',
                                    text: `${d.Name}`,
                                    gravity: 'center',
                                    flex: 4,
                                    size: 'sm',
                                    weight: 'bold',
                                    color: '#ffcf3d'
                                  }
                                ],
                                margin: 'lg'
                              }
                            ]
                          },
                          {
                            type: 'box',
                            layout: 'horizontal',
                            contents: [
                              {
                                type: 'box',
                                layout: 'vertical',
                                contents: [
                                  {
                                    type: 'box',
                                    layout: 'horizontal',
                                    contents: [
                                      {
                                        type: 'filler'
                                      },
                                      {
                                        type: 'box',
                                        layout: 'vertical',
                                        contents: [],
                                        width: '2px',
                                        backgroundColor: '#ffcf3d'
                                      },
                                      {
                                        type: 'filler'
                                      }
                                    ],
                                    flex: 1
                                  }
                                ],
                                width: '11px'
                              },
                              {
                                type: 'box',
                                layout: 'vertical',
                                contents: [
                                  {
                                    type: 'text',
                                    gravity: 'center',
                                    flex: 4,
                                    size: 'xs',
                                    color: '#8c8c8c',
                                    text: `${description}`
                                  }
                                ],
                                margin: 'lg'
                              }
                            ],
                            height: '25px',
                            paddingTop: '2px'
                          }
                        ]
                      }
                    ]
                  }
                ],
                paddingTop: '8px',
                action: {
                  type: 'postback',
                  label: 'action',
                  data: `${d.Name}地點介紹`
                }
              })
            }
            if (number === newidx[1] || number === newidx[2] || number === newidx[3]) {
              reply.contents.body.contents.push({
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'box',
                    layout: 'horizontal',
                    contents: [
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            size: 'xs',
                            gravity: 'center',
                            text: `${Org}`,
                            adjustMode: 'shrink-to-fit',
                            wrap: true,
                            maxLines: 2
                          }
                        ],
                        spacing: 'lg',
                        paddingTop: '4px',
                        width: '48px'
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'box',
                            layout: 'horizontal',
                            contents: [
                              {
                                type: 'box',
                                layout: 'vertical',
                                contents: [
                                  {
                                    type: 'filler'
                                  },
                                  {
                                    type: 'box',
                                    layout: 'vertical',
                                    contents: [],
                                    cornerRadius: '30px',
                                    height: '12px',
                                    width: '12px',
                                    borderColor: '#ffcf3d',
                                    borderWidth: '2px'
                                  },
                                  {
                                    type: 'filler'
                                  }
                                ],
                                flex: 0
                              },
                              {
                                type: 'box',
                                layout: 'vertical',
                                contents: [
                                  {
                                    type: 'text',
                                    text: `${d.Name}`,
                                    gravity: 'center',
                                    flex: 4,
                                    size: 'sm',
                                    weight: 'bold',
                                    color: '#ffcf3d'
                                  }
                                ],
                                margin: 'lg'
                              }
                            ]
                          },
                          {
                            type: 'box',
                            layout: 'horizontal',
                            contents: [
                              {
                                type: 'box',
                                layout: 'vertical',
                                contents: [
                                  {
                                    type: 'box',
                                    layout: 'horizontal',
                                    contents: [
                                      {
                                        type: 'filler'
                                      },
                                      {
                                        type: 'box',
                                        layout: 'vertical',
                                        contents: [],
                                        width: '2px',
                                        backgroundColor: '#ffcf3d'
                                      },
                                      {
                                        type: 'filler'
                                      }
                                    ],
                                    flex: 1
                                  }
                                ],
                                width: '11px'
                              },
                              {
                                type: 'box',
                                layout: 'vertical',
                                contents: [
                                  {
                                    type: 'text',
                                    gravity: 'center',
                                    flex: 4,
                                    size: 'xs',
                                    color: '#8c8c8c',
                                    text: `${description}`
                                  }
                                ],
                                margin: 'lg'
                              }
                            ],
                            height: '25px'
                          }
                        ]
                      }
                    ]
                  }
                ],
                paddingTop: '2px',
                action: {
                  type: 'postback',
                  label: 'action',
                  data: `${d.Name}地點介紹`
                }
              })
            }
            if (number === newidx[4]) {
              reply.contents.body.contents.push(
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'horizontal',
                      contents: [
                        {
                          type: 'box',
                          layout: 'vertical',
                          contents: [
                            {
                              type: 'text',
                              size: 'xs',
                              gravity: 'center',
                              text: `${Org}`,
                              adjustMode: 'shrink-to-fit',
                              wrap: true,
                              maxLines: 2
                            }
                          ],
                          spacing: 'lg',
                          paddingTop: '4px',
                          width: '48px'
                        },
                        {
                          type: 'box',
                          layout: 'vertical',
                          contents: [
                            {
                              type: 'box',
                              layout: 'horizontal',
                              contents: [
                                {
                                  type: 'box',
                                  layout: 'vertical',
                                  contents: [
                                    {
                                      type: 'filler'
                                    },
                                    {
                                      type: 'box',
                                      layout: 'vertical',
                                      contents: [],
                                      cornerRadius: '30px',
                                      height: '12px',
                                      width: '12px',
                                      borderColor: '#ffcf3d',
                                      borderWidth: '2px'
                                    },
                                    {
                                      type: 'filler'
                                    }
                                  ],
                                  flex: 0
                                },
                                {
                                  type: 'box',
                                  layout: 'vertical',
                                  contents: [
                                    {
                                      type: 'text',
                                      text: `${d.Name}`,
                                      gravity: 'center',
                                      flex: 4,
                                      size: 'sm',
                                      weight: 'bold',
                                      color: '#ffcf3d'
                                    }
                                  ],
                                  margin: 'lg'
                                }
                              ]
                            },
                            {
                              type: 'box',
                              layout: 'horizontal',
                              contents: [
                                {
                                  type: 'box',
                                  layout: 'vertical',
                                  contents: [
                                    {
                                      type: 'text',
                                      text: 'End',
                                      size: 'xxs',
                                      color: '#ffcf3d',
                                      weight: 'bold'
                                    }
                                  ],
                                  width: '24px'
                                },
                                {
                                  type: 'box',
                                  layout: 'vertical',
                                  contents: [
                                    {
                                      type: 'text',
                                      gravity: 'center',
                                      flex: 4,
                                      size: 'xs',
                                      color: '#8c8c8c',
                                      text: `${description}`
                                    }
                                  ],
                                  margin: 'lg'
                                }
                              ],
                              height: '25px',
                              alignItems: 'center'
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  paddingTop: '2px',
                  paddingBottom: '4px',
                  action: {
                    type: 'postback',
                    label: 'action',
                    data: `${d.Name}地點介紹`
                  }
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '(點擊景點查看地點介紹)',
                      size: 'xxs',
                      color: '#999999',
                      align: 'center'
                    }
                  ],
                  margin: 'md'
                }
              )
            }
            number++
          }
          event.reply(reply)
        } catch (error) {
          event.reply('我的腦波發生錯誤了，幫我叫醫生好嗎？')
        }
      }
      if (event.postback.data.includes(rr) && event.postback.data.includes('全部景點')) {
        try {
          const result = data.filter(d => {
            return d.Add.includes(rr) && d.Name !== '' && d.Add !== ''
          })
          const datalength = result.length
          const reply = {
            type: 'flex',
            altText: `${rr}全部景點`,
            contents: {
              type: 'bubble',
              body: {
                type: 'box',
                layout: 'vertical',
                spacing: 'md',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: `${rr}全部景點`,
                        size: 'md',
                        weight: 'bold'
                      },
                      {
                        type: 'text',
                        text: '請點擊來查看地點介紹與地圖',
                        size: 'xs',
                        color: '#999999',
                        offsetTop: '2px'
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: `共${datalength}筆`,
                            size: 'xs',
                            color: '#999999'
                          }
                        ],
                        position: 'absolute',
                        offsetEnd: '0px',
                        offsetBottom: '-2px'
                      }
                    ]
                  },
                  {
                    type: 'separator'
                  }
                ]
              }
            }
          }
          let number = 1
          let nowidx = 0
          for (let d of result) {
            let add = d.Add.replace(/\s*/g, '')
            if (nowidx < 10) {
              reply.contents.body.contents.push({
                type: 'box',
                layout: 'vertical',
                spacing: 'sm',
                contents: [
                  {
                    type: 'box',
                    layout: 'horizontal',
                    contents: [
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: `${number}`,
                            flex: 0,
                            align: 'center',
                            size: 'xxs',
                            color: '#ffffff',
                            offsetTop: '1px'
                          }
                        ],
                        backgroundColor: '#CFAE8F',
                        cornerRadius: '3px',
                        margin: 'xl',
                        width: '18px',
                        height: '18px',
                        offsetTop: '12px'
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: `${d.Name}`,
                            weight: 'bold',
                            margin: 'sm',
                            flex: 0,
                            wrap: true,
                            maxLines: 2,
                            size: 'sm'
                          },
                          {
                            type: 'text',
                            text: `${add}`,
                            color: '#928D8B',
                            size: 'xs'
                          }
                        ],
                        paddingStart: '8px',
                        flex: 0
                      }
                    ]
                  },
                  {
                    type: 'separator'
                  }
                ],
                offsetStart: '-2px',
                action: {
                  type: 'postback',
                  label: 'action',
                  data: `${d.Name}地點介紹`,
                  displayText: `${d.Name}地點介紹`
                }
              })
              number++
            }
            nowidx++
          }
          if (datalength > 10) {
            reply.contents.body.contents.push({
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: '隨機推薦',
                          align: 'center',
                          size: 'xs',
                          color: '#999999',
                          weight: 'bold'
                        }
                      ],
                      width: '68px',
                      cornerRadius: '3px',
                      action: {
                        type: 'postback',
                        label: 'action',
                        data: rr + '隨機推薦'
                      },
                      borderWidth: '1px',
                      borderColor: '#999999',
                      flex: 1
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: '下一頁',
                          align: 'center',
                          size: 'xs',
                          color: '#999999',
                          weight: 'bold'
                        }
                      ],
                      width: '58px',
                      cornerRadius: '3px',
                      action: {
                        type: 'postback',
                        label: 'action',
                        data: `${rr}下一頁${number}`
                      },
                      borderWidth: '1px',
                      borderColor: '#999999',
                      flex: 1,
                      margin: '10px'
                    }
                  ],
                  justifyContent: 'flex-end',
                  width: '100%'
                }
              ],
              alignItems: 'center',
              width: '100%'
            })
          }
          event.reply(reply)
        } catch (error) {
          event.reply('我的腦波發生錯誤了，幫我叫醫生好嗎？')
        }
      }
      if (event.postback.data.includes(rr) && event.postback.data.includes('離我最近')) {
        try {
          event.reply({
            type: 'text',
            text: '兄弟 先告訴我你在哪吧!\n（此功能僅支援手機版）',
            quickReply: {
              items: [
                {
                  type: 'action',
                  action: {
                    type: 'location',
                    label: '傳送目前所在位置'
                  }
                }
              ]
            }
          })
        } catch (error) {
          event.reply('我的腦波發生錯誤了，幫我叫醫生好嗎？')
        }
      }
      if (event.postback.data.includes(rr) && event.postback.data.includes('下一頁')) {
        try {
          const result = data.filter(d => {
            return d.Add.includes(rr) && d.Name !== '' && d.Add !== ''
          })
          const datalength = data.length

          let number = parseInt(event.postback.data.substr(6, 3))
          let max = number + 10
          let min = number
          let nowidx = 1
          const reply = {
            type: 'flex',
            altText: `${rr}全部景點`,
            contents: {
              type: 'bubble',
              body: {
                type: 'box',
                layout: 'vertical',
                spacing: 'md',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: `${rr}全部景點`,
                        size: 'md',
                        weight: 'bold'
                      },
                      {
                        type: 'text',
                        text: '請點擊來查看地點介紹與地圖',
                        size: 'xs',
                        color: '#999999',
                        offsetTop: '2px'
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: `共${datalength}筆`,
                            size: 'xs',
                            color: '#999999'
                          }
                        ],
                        position: 'absolute',
                        offsetEnd: '0px',
                        offsetBottom: '-2px'
                      }
                    ]
                  },
                  {
                    type: 'separator'
                  }
                ]
              }
            }
          }
          for (let d of result) {
            let add = d.Add.replace(/\s*/g, '')
            if (nowidx > min && nowidx <= max) {
              reply.contents.body.contents.push({
                type: 'box',
                layout: 'vertical',
                spacing: 'sm',
                contents: [
                  {
                    type: 'box',
                    layout: 'horizontal',
                    contents: [
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: `${number}`,
                            flex: 0,
                            align: 'center',
                            size: 'xxs',
                            color: '#ffffff',
                            offsetTop: '1px'
                          }
                        ],
                        backgroundColor: '#CFAE8F',
                        cornerRadius: '3px',
                        margin: 'xl',
                        width: '18px',
                        height: '18px',
                        offsetTop: '12px'
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: `${d.Name}`,
                            weight: 'bold',
                            margin: 'sm',
                            flex: 0,
                            wrap: true,
                            maxLines: 2,
                            size: 'sm'
                          },
                          {
                            type: 'text',
                            text: `${add}`,
                            color: '#928D8B',
                            size: 'xs'
                          }
                        ],
                        paddingStart: '8px',
                        flex: 0
                      }
                    ]
                  },
                  {
                    type: 'separator'
                  }
                ],
                offsetStart: '-2px',
                action: {
                  type: 'postback',
                  label: 'action',
                  data: `${d.Name}地點介紹`,
                  displayText: `${d.Name}地點介紹`
                }
              })
              number++
            }
            nowidx++
          }
          if (number < datalength) {
            reply.contents.body.contents.push({
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: '隨機推薦',
                          align: 'center',
                          size: 'xs',
                          color: '#999999',
                          weight: 'bold'
                        }
                      ],
                      width: '68px',
                      cornerRadius: '3px',
                      action: {
                        type: 'postback',
                        label: 'action',
                        data: rr + '隨機推薦'
                      },
                      borderWidth: '1px',
                      borderColor: '#999999',
                      flex: 1
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: '下一頁',
                          align: 'center',
                          size: 'xs',
                          color: '#999999',
                          weight: 'bold'
                        }
                      ],
                      width: '58px',
                      cornerRadius: '3px',
                      action: {
                        type: 'postback',
                        label: 'action',
                        data: `${rr}下一頁${number}`
                      },
                      borderWidth: '1px',
                      borderColor: '#999999',
                      flex: 1,
                      margin: '10px'
                    }
                  ],
                  justifyContent: 'flex-end',
                  width: '100%'
                }
              ],
              alignItems: 'center',
              width: '100%'
            })
          }
          event.reply(reply)
        } catch (error) {
          event.reply('我的腦波發生錯誤了，幫我叫醫生好嗎？')
        }
      }
      if (event.postback.data.includes(rr) && event.postback.data.includes('隨機推薦')) {
        try {
          const result = data.filter(d => {
            return d.Add.includes(rr) && d.Name !== '' && d.Add !== ''
          })
          const datalength = result.length
          let number = 1
          let nowidx = 0
          let random = []
          const reply = {
            type: 'flex',
            altText: `${rr}隨機推薦景點`,
            contents: {
              type: 'bubble',
              body: {
                type: 'box',
                layout: 'vertical',
                spacing: 'md',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: `${rr}隨機推薦景點`,
                        size: 'md',
                        weight: 'bold'
                      },
                      {
                        type: 'text',
                        text: '請點擊來查看地點介紹與地圖',
                        size: 'xs',
                        color: '#999999',
                        offsetTop: '2px'
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: `共5筆`,
                            size: 'xs',
                            color: '#999999'
                          }
                        ],
                        position: 'absolute',
                        offsetEnd: '0px',
                        offsetBottom: '-2px'
                      }
                    ]
                  },
                  {
                    type: 'separator'
                  }
                ]
              }
            }
          }
          for (let i = 0; i < 5; i++) {
            random.push(parseInt(Math.round(Math.random() * (datalength - 1))))
          }
          for (let d of result) {
            for (let i of random) {
              let add = d.Add.replace(/\s*/g, '')
              if (nowidx === i) {
                reply.contents.body.contents.push({
                  type: 'box',
                  layout: 'vertical',
                  spacing: 'sm',
                  contents: [
                    {
                      type: 'box',
                      layout: 'horizontal',
                      contents: [
                        {
                          type: 'box',
                          layout: 'vertical',
                          contents: [
                            {
                              type: 'text',
                              text: `${number}`,
                              flex: 0,
                              align: 'center',
                              size: 'xxs',
                              color: '#ffffff',
                              offsetTop: '1px'
                            }
                          ],
                          backgroundColor: '#FBE68B',
                          cornerRadius: '3px',
                          margin: 'xl',
                          width: '18px',
                          height: '18px',
                          offsetTop: '12px'
                        },
                        {
                          type: 'box',
                          layout: 'vertical',
                          contents: [
                            {
                              type: 'text',
                              text: `${d.Name}`,
                              weight: 'bold',
                              margin: 'sm',
                              flex: 0,
                              wrap: true,
                              maxLines: 2,
                              size: 'sm'
                            },
                            {
                              type: 'text',
                              text: `${add}`,
                              color: '#928D8B',
                              size: 'xs'
                            }
                          ],
                          paddingStart: '8px',
                          flex: 0
                        }
                      ]
                    },
                    {
                      type: 'separator'
                    }
                  ],
                  offsetStart: '-2px',
                  action: {
                    type: 'postback',
                    label: 'action',
                    data: `${d.Name}地點介紹`,
                    displayText: `${d.Name}地點介紹`
                  }
                })
                number++
              }
            }
            nowidx++
          }

          if (number < datalength) {
            reply.contents.body.contents.push({
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: '隨機推薦',
                          align: 'center',
                          size: 'xs',
                          color: '#999999',
                          weight: 'bold'
                        }
                      ],
                      width: '68px',
                      cornerRadius: '3px',
                      action: {
                        type: 'postback',
                        label: 'action',
                        data: rr + '隨機推薦'
                      },
                      borderWidth: '1px',
                      borderColor: '#999999',
                      flex: 1
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: '下一頁',
                          align: 'center',
                          size: 'xs',
                          color: '#999999',
                          weight: 'bold'
                        }
                      ],
                      width: '58px',
                      cornerRadius: '3px',
                      action: {
                        type: 'postback',
                        label: 'action',
                        data: `${rr}下一頁${number}`
                      },
                      borderWidth: '1px',
                      borderColor: '#999999',
                      flex: 1,
                      margin: '10px'
                    }
                  ],
                  justifyContent: 'flex-end',
                  width: '100%'
                }
              ],
              alignItems: 'center',
              width: '100%'
            })
          }
          event.reply(reply)
        } catch (error) {
          event.reply('我的腦波發生錯誤了，幫我叫醫生好嗎？')
        }
      }
    }
  }

  if (event.postback.data.includes('地點介紹')) {
    try {
      const result = data.filter(d => {
        return d.Name === event.postback.data.slice(0, -4)
      })
      let description = ''
      if (result[0].Description == null || result[0].Description === '') {
        description = result[0].Toldescribe
      } else {
        description = result[0].Description
      }

      const reply = {
        type: 'flex',
        altText: `${result[0].Name}地點介紹`,
        contents: {
          type: 'bubble',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'box',
                    layout: 'horizontal',
                    contents: [
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'image',
                            url: 'https://raw.githubusercontent.com/zoe01214/travelduck-linebot/main/google-maps-icon.png',
                            size: '25px'
                          }
                        ],
                        width: '40px'
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: `${result[0].Name}`,
                            size: 'md',
                            weight: 'bold',
                            wrap: false,
                            maxLines: 1,
                            align: 'center',
                            offsetTop: '2px'
                          },
                          {
                            type: 'text',
                            text: `${result[0].Add}`,
                            size: 'xs',
                            wrap: false,
                            maxLines: 1,
                            color: '#999999'
                          }
                        ],
                        alignItems: 'flex-start',
                        paddingStart: '20px'
                      }
                    ],
                    alignItems: 'center'
                  }
                ],
                paddingBottom: '5px',
                paddingTop: '2px'
              },
              {
                type: 'separator'
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: description,
                    size: 'sm',
                    wrap: true,
                    adjustMode: 'shrink-to-fit'
                  }
                ],
                paddingTop: '5px'
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: '(點擊視窗連結到地圖)',
                    align: 'center',
                    size: 'xxs',
                    color: '#999999'
                  }
                ],
                paddingTop: '5px'
              }
            ],
            action: {
              type: 'uri',
              label: 'action',
              uri: `https://www.google.com/maps/search/?api=1&query=${encodeURI(result[0].Name)}`
            }
          }
        }
      }
      event.reply(reply)
    } catch (error) {
      event.reply('我的腦波發生錯誤了，幫我叫醫生好嗎？')
    }
  }
})

bot.on('join', function (event) {
  event.reply('大家好~~我是踏遍全台的旅遊鴨\n以後想去哪裡玩找我就對了!!\n\n輸入景點或傳位置就幫你找囉')
})
bot.on('leave', function (event) {
  event.reply('太傷心了吧 居然不相信我的專業QQ\n這可都是跟政府要的資料嗎\n竟然這樣狠心踢掉我(甩)')
})
bot.on('memberJoined', function (event) {
  event.reply('又有新小弟加入了嗎~~\n我是踏遍全台的大鴨鴨\n跟著哥 以後帶你吃香喝辣\n\n輸入景點或傳位置就幫你找囉')
})
bot.on('memberLeft', function (event) {
  event.reply('不~~~~別走~~~\n這樣我的跟屁蟲又少了一個 很沒面子的!')
})
bot.on('follow', function (event) {
  event.reply('你好鴨~~我是踏遍全台的旅遊鴨\n如果想去哪裡玩找我就對了!!\n\n輸入景點或傳位置就幫你找囉')
})
