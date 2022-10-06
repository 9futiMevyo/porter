import React, { useEffect, useState } from "react";

import styled from "styled-components";
import RadioFilter from "components/RadioFilter";

import filterOutline from "assets/filter-outline.svg";
import DateTimePicker from "components/date-time-picker/DateTimePicker";

type Props = {
  currentChart?: any;
  isFullscreen: boolean;
  setIsFullscreen: (x: boolean) => void;
};

const LogsSection: React.FC<Props> = ({
  currentChart,
  isFullscreen,
  setIsFullscreen,
}) => {
  const [podFilter, setPodFilter] = useState("pod-a");
  const [scrollToBottom, setScrollToBottom] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    console.log(currentChart);
  }, []);

  const [startDate, setStartDate] = useState(new Date());

  const renderContents = () => {
    return (
      <>
        <FlexRow isFullscreen={isFullscreen}>
          <Flex>
            <SearchRowWrapper>
              <SearchBarWrapper>
                <i className="material-icons">search</i>
                <SearchInput
                  value={searchText}
                  onChange={(e: any) => {
                    setSearchText(e.value);
                  }}
                  placeholder="Search logs..."
                />
              </SearchBarWrapper>
            </SearchRowWrapper>
            <DateTimePicker startDate={startDate} setStartDate={setStartDate} />
            <RadioFilter
              icon={filterOutline}
              selected={podFilter}
              setSelected={setPodFilter}
              options={[
                {
                  value: "pod-a",
                  label: "Pod A",
                },
                {
                  value: "pod-b",
                  label: "Pod B",
                },
                {
                  value: "pod-c",
                  label: "Pod C",
                },
                {
                  value: "pod-d",
                  label: "Pod D",
                },
              ]}
              name="Filter logs"
            />
          </Flex>
          <Flex>
            <Button onClick={() => setScrollToBottom(!scrollToBottom)}>
              <Checkbox checked={scrollToBottom}>
                <i className="material-icons">done</i>
              </Checkbox>
              Scroll to bottom
            </Button>
            <Spacer />
            <Button>
              <i className="material-icons">autorenew</i>
              Refresh
            </Button>
            {!isFullscreen && (
              <>
                <Spacer />
                <Icon onClick={() => setIsFullscreen(true)}>
                  <i className="material-icons">open_in_full</i>
                </Icon>
              </>
            )}
          </Flex>
        </FlexRow>
        <StyledLogsSection isFullscreen={isFullscreen}>
          <Message>
            No matching logs found.
            <Highlight onClick={() => {}}>
              <i className="material-icons">autorenew</i>
              Refresh
            </Highlight>
          </Message>
        </StyledLogsSection>
      </>
    );
  };

  return (
    <>
      {isFullscreen ? (
        <Fullscreen>
          <AbsoluteTitle>
            <BackButton onClick={() => setIsFullscreen(false)}>
              <i className="material-icons">navigate_before</i>
            </BackButton>
            Logs ({currentChart.name})
          </AbsoluteTitle>
          {renderContents()}
        </Fullscreen>
      ) : (
        <>{renderContents()}</>
      )}
    </>
  );
};

export default LogsSection;

const BackButton = styled.div`
  display: flex;
  width: 30px;
  z-index: 999;
  cursor: pointer;
  height: 30px;
  align-items: center;
  margin-right: 15px;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #ffffff55;
  border-radius: 100px;
  background: #ffffff11;

  > i {
    font-size: 18px;
  }

  :hover {
    background: #ffffff22;
    > img {
      opacity: 1;
    }
  }
`;

const AbsoluteTitle = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 18px;
  font-weight: 500;
  user-select: text;
`;

const Fullscreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 60px;
`;

const Icon = styled.div`
  background: #26292e;
  border-radius: 5px;
  height: 30px;
  width: 30px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  > i {
    font-size: 14px;
  }
  border: 1px solid #494b4f;
  :hover {
    border: 1px solid #7a7b80;
  }
`;

const Checkbox = styled.div<{ checked: boolean }>`
  width: 16px;
  height: 16px;
  border: 1px solid #ffffff55;
  margin: 1px 10px 0px 1px;
  border-radius: 3px;
  background: ${(props) => (props.checked ? "#ffffff22" : "#ffffff11")};
  display: flex;
  align-items: center;
  justify-content: center;

  > i {
    font-size: 12px;
    padding-left: 0px;
    display: ${(props) => (props.checked ? "" : "none")};
  }
`;

const Spacer = styled.div<{ width?: string }>`
  height: 100%;
  width: ${(props) => props.width || "10px"};
`;

const Button = styled.div`
  background: #26292e;
  border-radius: 5px;
  height: 30px;
  font-size: 13px;
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 10px;
  padding-left: 8px;
  > i {
    font-size: 16px;
    margin-right: 5px;
  }
  border: 1px solid #494b4f;
  :hover {
    border: 1px solid #7a7b80;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 25px solid transparent;
`;

const Message = styled.div`
  display: flex;
  height: 100%;
  width: calc(100% - 150px);
  align-items: center;
  justify-content: center;
  margin-left: 75px;
  text-align: center;
  color: #ffffff44;
  font-size: 13px;
`;

const Highlight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  color: #8590ff;
  cursor: pointer;

  > i {
    font-size: 16px;
    margin-right: 3px;
  }
`;

const FlexRow = styled.div<{ isFullscreen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: ${(props) => (props.isFullscreen ? "10px" : "")};
  padding: ${(props) => (props.isFullscreen ? "0 20px" : "")};
`;

const SearchBarWrapper = styled.div`
  display: flex;
  flex: 1;

  > i {
    color: #aaaabb;
    padding-top: 1px;
    margin-left: 8px;
    font-size: 16px;
    margin-right: 8px;
  }
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  font-size: 13px;
  background: none;
  width: 100%;
  color: white;
  height: 100%;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  margin-right: 10px;
  background: #26292e;
  border-radius: 5px;
  border: 1px solid #aaaabb33;
`;

const SearchRowWrapper = styled(SearchRow)`
  border-radius: 5px;
  width: 250px;
`;

const StyledLogsSection = styled.div<{ isFullscreen: boolean }>`
  width: 100%;
  min-height: 400px;
  height: ${(props) =>
    props.isFullscreen ? "calc(100vh - 125px)" : "calc(100vh - 460px)"};
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 13px;
  border-radius: ${(props) => (props.isFullscreen ? "" : "8px")};
  border: ${(props) => (props.isFullscreen ? "" : "1px solid #ffffff33")};
  border-top: ${(props) => (props.isFullscreen ? "1px solid #ffffff33" : "")};
  padding: 18px 22px;
  background: #121318;
  animation: floatIn 0.3s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  @keyframes floatIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;
