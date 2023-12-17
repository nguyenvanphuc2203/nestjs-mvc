import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { CreateCommentDto } from "./dto/comment.dto";
import { CommentService } from "./comment.service";
import { Comment } from "./interfaces/comment.interface";

@Controller("items")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id): Promise<Comment> {
    return this.commentService.findOne(id);
  }
}
