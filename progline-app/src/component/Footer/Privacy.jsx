import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export default function Privacy() {
  useEffect(() => {
    const scrollToInfo = () => {
      const element = document.getElementById("info");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToInfo();
  }, []);
  return (
    <div
      className="flex justify-center min-h-screen py-[100px] bg-[#f7f9fb] rounded"
      id="info"
    >
      <Helmet>
        <title>プライバシーポリシー | PROGLINE</title>
      </Helmet>
      <div className="bg-white mx-[10px] px-[30px] min-[900px]:mx-[100px] min-[1500px]:mx-[328px] min-[900px]:px-[60px]">
        <h1 className="text-2xl min-[400px]:text-3xl font-bold mb-4 text-center mt-[60px]">
          プライバシーポリシー
        </h1>

        <h2 className="text-xl font-semibold mt-[70px] mb-2">
          お客様から取得する情報
        </h2>
        <p className="mb-4">当社は、お客様から以下の情報を取得します。</p>
        <ul className="list-disc list-inside mb-4">
          <li>氏名(ニックネームやペンネームも含む)</li>
          <li>メールアドレス</li>
          <li>写真や動画</li>
          <li>
            外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
          </li>
          <li>Cookie(クッキー)を用いて生成された識別情報</li>
          <li>
            OSが生成するID、端末の種類、端末識別子等のお客様が利用するOSや端末に関する情報
          </li>
          <li>
            当社ウェブサイトの滞在時間、入力履歴、購買履歴等の当社ウェブサイトにおけるお客様の行動履歴
          </li>
          <li>
            当社アプリの起動時間、入力履歴、購買履歴等の当社アプリの利用履歴
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          お客様の情報を利用する目的
        </h2>
        <p className="mb-4">
          当社は、お客様から取得した情報を、以下の目的のために利用します。
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>当社サービスに関する登録の受付、お客様の本人確認、認証のため</li>
          <li>お客様の当社サービスの利用履歴を管理するため</li>
          <li>利用料金の決済のため</li>
          <li>
            当社サービスにおけるお客様の行動履歴を分析し、当社サービスの維持改善に役立てるため
          </li>
          <li>当社のサービスに関するご案内をするため</li>
          <li>お客様からのお問い合わせに対応するため</li>
          <li>当社の規約や法令に違反する行為に対応するため</li>
          <li>当社サービスの変更、提供中止、終了、契約解除をご連絡するため</li>
          <li>当社規約の変更等を通知するため</li>
          <li>以上の他、当社サービスの提供、維持、保護及び改善のため</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          安全管理のために講じた措置
        </h2>
        <p className="mb-4">
          当社が、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、法令の定めに従い個別にご回答させていただきます。
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">第三者提供</h2>
        <p className="mb-4">
          当社は、お客様から取得する情報のうち、個人データ（個人情報保護法第１６条第３項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
          但し、次の場合は除きます。
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>個人データの取扱いを外部に委託する場合</li>
          <li>当社や当社サービスが買収された場合</li>
          <li>
            事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
          </li>
          <li>その他、法律によって合法的に第三者提供が許されている場合</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          プライバシーポリシーの変更
        </h2>
        <p className="mb-4">
          当社は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
        </p>

        <p className="text-right mt-8 mb-[60px]">2024年05月31日 制定</p>
      </div>
    </div>
  );
}
