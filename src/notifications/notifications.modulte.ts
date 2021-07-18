import { Module } from "@nestjs/common";
import { ConfigsModule } from "src/configs/configs.module";
import { NotificationsService } from "./notifications.service";

@Module({
    imports: [ConfigsModule],
    providers: [NotificationsService],
    exports: [NotificationsService]
})
export class NotificationsModule { }