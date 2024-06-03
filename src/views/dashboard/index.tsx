import { Col, Row, Space } from 'antd';

import AreaDownload from './components/area-download.tsx';
import BannerCard from './components/banner-card.tsx';
import { Applications, Conversion } from './components/conversion_applications.tsx';
import Satisfaction from './components/satisfaction.tsx'
import TotalCard from './components/total-card.tsx';

function Workbench() {
    return (
        <>
            <Row gutter={[16, 16]} justify="center">
                <Col span={24} md={16}>
                    <BannerCard />
                </Col>
                <Col span={24} md={8}>
                    <Space direction="vertical" size="middle" className="h-full w-full">
                        <Conversion />
                        <Applications />
                    </Space>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className="mt-4" justify="center">
                <Col span={24} md={8}>
                    <TotalCard
                        title="Total Active Users"
                        increase
                        count="18,765"
                        percent="2.6%"
                        chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
                    />
                </Col>

                <Col span={24} md={8}>
                    <TotalCard
                        title="Total Installed"
                        increase
                        count="4,876"
                        percent="0.2%"
                        chartData={[45, 52, 38, 24, 33, 26, 21, 20, 6]}
                    />
                </Col>

                <Col span={24} md={8}>
                    <TotalCard
                        title="Total Downloads"
                        increase={false}
                        count="678"
                        percent="0.1%"
                        chartData={[35, 41, 62, 42, 13, 18, 29, 37, 36]}
                    />
                </Col>
            </Row>

            <Row gutter={[16, 16]} className="mt-4" justify="center">
                <Col span={24} md={12} lg={8}>
                    <Satisfaction />
                </Col>
                <Col span={24} md={12} lg={16}>
                    <AreaDownload />
                </Col>
            </Row>
        </>
    );
}

export default Workbench;
