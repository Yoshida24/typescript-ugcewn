export interface trackersConfig {
  event?: {
    trackers: {
      [url: string]: TrackerEventDefinition[];
    };
  };
}

export type TrackerEventDefinition = TrackerDefGlobalVarAnd;

interface TrackerDefGlobalVarAnd extends TrackerPocDefBase {
  type: 'globalVarAnd';
  data: {
    globalVarAnd: [
      {
        name: string;
        value: RegExp;
      }
    ];
    retry?: {
      retries: number;
      interval: number;
    };
  };
}

interface TrackerPocDefBase {
  activities: Array<TrackerPocActivity>;
  regexType: UrlRegexType;
}

interface TrackerPocActivity {
  activity: string;
  wait?: number;
}

type UrlRegexType = 'directory' | 'page' | 'regex';

/**
 * DSLで条件を複雑に書くのはやめた方がいいぞ
 *   jsでconditionかけるようにしちゃった方がいい
 *   evalを使ってしまえばいい（任意コード実行のリスクは下がらない）
 * リソースAPI？
 *   行動データ登録APIは？
 *     ダメそう
 * 行動データ定義用のUIは管理画面とは完全に別個
 *    何が起きてるのかはよくわからなくなる可能性が高い
 *      editorとしてTypeScriptとVSCodeが優秀だと感じる
 *        type, keyの補完はtype定義しとけば完全に補完が効く
 *          CSに使ってほしいからGUIがいいな
 *             エディタはCUIをtypescriptとかGUIとか色々作ったら良さそう
 * 　　　　　　　　　　　　　　　　　　　　　　　　　Github
 * conditionを持つようにしたいときこうしたらどうかというやつをやってみる
 * {
    "event": {
      "trackers": {
        ".*": [
          {
            "activities": "activities.custom.global_var_and",
            "regexType": "regex",
            "type": "globalVarAnd",
            "data": {
              "condition": [
                {
                  "url": {
                    "match": ""
                  }
                }
              ],
              "globalVarAnd": [
                {
                  "name": "foo",
                  "value": "bar"
                }
              ],
              "retry": {
                "retries": 10,
                "interval": 500
              }
            }
          }
        ]
      }
    }
  }
  キャッシュはsessionstorageにもつ方が勝手に消えてくれていいだろう
  セッション中行動回数カウンターのやつを設定できると、カスタムルール定義はなくなる
  https://sprocket.slack.com/archives/C0J7NL59S/p1643783161624679
      これの https://github.com/sprocket-inc/proto-user_modeling_in_client/blob/main/src/features/LookPageIntently.ts
      設定値が必要な行動データはresource.jsonに寄せよう
        click_heatmapもそのようにしてしまって良い、ということ
  
 */