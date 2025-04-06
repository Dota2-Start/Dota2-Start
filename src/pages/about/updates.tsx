import { Button, Flex, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import Markdown from 'react-markdown'
import { UpdateType, checkForUpdates } from "@/mod/update";
import { AppDataStore } from "@/mod/store";
import { getVersion } from "@tauri-apps/api/app";
import { LocalStor } from "@/mod/locale_load";



const version = await getVersion();
const { Text } = Typography;
const Updates: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);
  const [update, setUpdate] = useState<UpdateType | undefined>();
  const { Skipversion, setAppData } = AppDataStore()
  const { Local } = LocalStor()
  const upModal = Local?.$upModal
  const nomitCancel = () => {
    setAppData({ Skipversion: update?.latestVersion })
    setIsModalOpen(false);
  }
  const updates = () => {
    setBtnLoad(true)
    checkForUpdates(version).then((update) => {
      if (update) {
        setUpdate(update)
        if (update.latestVersion != Skipversion) {
          showModal()
        }
      } else {
        setUpdate(undefined)
      }
      setBtnLoad(false)
    });
  }
  useEffect(updates, [])
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onClickbtn = () => {
    if (update) {
      showModal()
    } else {
      updates()
    }
  }
  return (
    <>
      <Flex justify="center" align="center" gap={8}>

        {
          btnLoad ? <Text >{upModal?.textA?.[0]}</Text> :
            update ? (
              <Text >{upModal?.textA?.[1]}</Text>
            ) : (
              <Text type="secondary">{upModal?.textA?.[2]}</Text>
            )
        }
        <Button
          onClick={onClickbtn}
          color={update ? "yellow" : "primary"}
          variant="link"
          loading={btnLoad}>
          {(btnLoad ? upModal?.textB?.[0] : update ? upModal?.textB?.[1] : upModal?.textB?.[2]) || '检查更新'}
        </Button>
      </Flex>

      <Modal
        title={`${upModal?.title}${update?.latestVersion}`}
        open={isModalOpen}
        style={{ userSelect: 'text' }}
        styles={{
          body: {
            maxHeight: '62vh',
            overflowY: 'auto'
          }
        }}
        centered
        footer={[
          <Button
            key="nomit"
            type="default"
            onClick={nomitCancel}>
            {upModal?.noText}
          </Button>,
          <Button
            key="submit"
            type="primary"
            href="https://gitee.com/ilinxuan/windows_-auto-theme/releases/latest"
            target="_blank"
            onClick={handleCancel}>
            {upModal?.okText} (Gitee)
          </Button>,
          <Button
            key="link"
            href={update?.releaseUrl}
            target="_blank"
            type="primary"
            onClick={handleCancel}
          >
            {upModal?.okText} (GitHub)
          </Button>,
        ]}
        maskClosable={false}
        onCancel={handleCancel}
      >
        <Markdown>{`#### ${upModal?.upData} :\n ${update?.releaseNotes}`}</Markdown>
      </Modal></>
  )
}
export default Updates

