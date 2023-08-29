import { FC } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { selectAppState } from "../store/app/selector"
import {
  Box,
  Card,
  CardContent,
  Link,
  Sheet,
  Typography,
  styled,
} from "@mui/joy"
import { getDateForTimestamp } from "../services/utils"
import { fetchAccountInfo } from "../store/app/thunks"

export const Dashboard: FC = () => {
  const {
    accountInfo,
    liveStreams,
    vodStreams,
    seriesStreams,
    watchlist,
    lastFetchedAccountInfo,
  } = useAppSelector(selectAppState)
  const dispatch = useAppDispatch()

  console.log(accountInfo)

  const refreshInfo = () => {
    dispatch(fetchAccountInfo({}))
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Card
        orientation="horizontal"
        sx={{
          width: "100%",
          //flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
          // make the card resizable for demo
          //resize: "horizontal",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            level="title-lg"
            justifyContent="center"
            display="flex"
            paddingBottom={5}
          >
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
              <b>Provider</b>
            </Item>
            <Item>{accountInfo.server_info?.url}</Item>
            <Item>
              <b>Username</b>
            </Item>
            <Item>{accountInfo.user_info?.username}</Item>
            <Item>
              <b>Account Status</b>
            </Item>
            <Item>{accountInfo.user_info?.status}</Item>
            <Item>
              <b>Creation Date</b>
            </Item>
            <Item>
              {getDateForTimestamp(
                accountInfo.user_info?.created_at ?? 0,
              ).toDateString()}
            </Item>
            <Item>
              <b>Expire Date</b>
            </Item>
            <Item>
              {getDateForTimestamp(
                accountInfo.user_info?.exp_date ?? 0,
              ).toDateString()}
            </Item>
            <Item>
              <b>Is Trial</b>
            </Item>
            <Item>{accountInfo.user_info?.is_trial === 1 ? "Yes" : "No"}</Item>
            <Item>
              <b>Max Connections</b>
            </Item>
            <Item>{accountInfo.user_info?.max_connections}</Item>
            <Item>
              <b>Active Connections</b>
            </Item>
            <Item>{accountInfo.user_info?.active_cons}</Item>
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
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <div>
              <Typography
                level="body-xs"
                fontWeight="lg"
                justifyContent="center"
                display="flex"
              >
                Live Channels
              </Typography>
              <Typography
                fontWeight="lg"
                justifyContent="center"
                display="flex"
              >
                {liveStreams.length}
              </Typography>
            </div>
            <div>
              <Typography
                level="body-xs"
                fontWeight="lg"
                justifyContent="center"
                display="flex"
              >
                Movies
              </Typography>
              <Typography
                fontWeight="lg"
                justifyContent="center"
                display="flex"
              >
                {vodStreams.length}
              </Typography>
            </div>
            <div>
              <Typography
                level="body-xs"
                fontWeight="lg"
                justifyContent="center"
                display="flex"
              >
                TV Shows
              </Typography>
              <Typography
                fontWeight="lg"
                justifyContent="center"
                display="flex"
              >
                {seriesStreams.length}
              </Typography>
            </div>
            <div>
              <Typography
                level="body-xs"
                fontWeight="lg"
                justifyContent="center"
                display="flex"
              >
                Watchlist
              </Typography>
              <Typography
                fontWeight="lg"
                justifyContent="center"
                display="flex"
              >
                {watchlist.length}
              </Typography>
            </div>
          </Sheet>
        </CardContent>
      </Card>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <Typography>
          Last refreshed:
          {" " + new Date(lastFetchedAccountInfo).toLocaleTimeString()}
        </Typography>
        <Link sx={{ marginLeft: 2 }} onClick={refreshInfo}>
          Refresh
        </Link>
      </div>
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
