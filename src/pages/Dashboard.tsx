import { FC } from "react"
import { useAppSelector } from "../store/hooks"
import { selectAppState } from "../store/app/selector"
import { Box, Card, CardContent, Sheet, Typography, styled } from "@mui/joy"
import { getDateForTimestamp } from "../services/utils"

export const Dashboard: FC = () => {
  const { accountInfo, liveStreams, vodStreams, seriesStreams } =
    useAppSelector(selectAppState)

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
      }}
    >
      <Card
        orientation="horizontal"
        sx={{
          width: "100%",
          flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
          // make the card resizable for demo
          overflow: "auto",
          //resize: "horizontal",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography level="title-lg" justifyContent="center" display="flex">
            Your Account
          </Typography>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              flexGrow: 1,
              columnGap: 40,
              rowGap: 5,
            }}
          >
            <Item>
              <b>Username</b>
            </Item>
            <Item>{accountInfo.username}</Item>
            <Item>
              <b>Account Status</b>
            </Item>
            <Item>{accountInfo.status}</Item>
            <Item>
              <b>Creation Date</b>
            </Item>
            <Item>
              {getDateForTimestamp(accountInfo.created_at ?? 0).toDateString()}
            </Item>
            <Item>
              <b>Expire Date</b>
            </Item>
            <Item>
              {getDateForTimestamp(accountInfo.exp_date ?? 0).toDateString()}
            </Item>
            <Item>
              <b>Is Trial</b>
            </Item>
            <Item>{accountInfo.is_trial}</Item>
            <Item>
              <b>Max Connections</b>
            </Item>
            <Item>{accountInfo.max_connections}</Item>
            <Item>
              <b>Active Connections</b>
            </Item>
            <Item>{accountInfo.active_cons}</Item>
          </div>
          <Sheet
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",
              gap: 2,
              "& > div": { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Live Channels
              </Typography>
              <Typography fontWeight="lg">{liveStreams.length}</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Videos-On-Demand
              </Typography>
              <Typography fontWeight="lg">{vodStreams.length}</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Series
              </Typography>
              <Typography fontWeight="lg">{seriesStreams.length}</Typography>
            </div>
          </Sheet>
        </CardContent>
      </Card>
    </Box>
  )
}

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: theme.palette.background.level1,
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}))
