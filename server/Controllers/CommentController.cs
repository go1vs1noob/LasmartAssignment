using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using server.Data;
using server.Models;
using server.Models.DTOs;

namespace server.Controllers;
[ApiController]
[Route("api/[controller]")]
public class CommentsController : ControllerBase
{
    private readonly PointContext _pointContext;
    public CommentsController(PointContext pointContext)
    {
        _pointContext = pointContext;
    }
    [HttpGet]
    public async Task<ActionResult<List<Comment>>> GetAllComments()
    {
        return await _pointContext
            .Comments
            .Include(c => c.Point)
            .ToListAsync();
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Comment>> GetCommentById(int id)
    {
        Comment? comment = await _pointContext
            .Comments
            .Include(c => c.Point)
            .FirstOrDefaultAsync(c => c.Id == id);
        if (comment == null)
        {
            return NotFound();
        }
        return Ok(comment);
    }
    [HttpPost]
    public async Task<ActionResult<Comment>> AddComment([FromBody] AddCommentDTO commentDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }
        Point? pointForComment = await _pointContext
                                        .Points
                                        .Include(p => p.Comments)
                                        .FirstOrDefaultAsync(p => p.Id == commentDto.PointId);
        if (pointForComment == null)
        {
            return NotFound();
        }
        Comment comment = new Comment()
        {
            Text = commentDto.Text,
            ColorHex = commentDto.ColorHex,
            PointId = commentDto.PointId,
            Point = pointForComment
        };

        pointForComment.Comments.Add(comment);
        await _pointContext.Comments.AddAsync(comment);
        await _pointContext.SaveChangesAsync();
        return Ok(comment);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<Comment>> DeleteComment(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        Comment? commentToDelete = await _pointContext
                                    .Comments
                                    .FirstOrDefaultAsync(c => c.Id == id);


        if (commentToDelete == null)
        {
            return NotFound();
        }
        Point? point = await _pointContext
            .Points
            .Include(p => p.Comments)
            .FirstOrDefaultAsync(p => p.Comments.Contains(commentToDelete));
        if (point != null)
        {
            point.Comments.Remove(commentToDelete);
        }

        _pointContext.Comments.Remove(commentToDelete);
        await _pointContext.SaveChangesAsync();
        return Ok(commentToDelete.Id);
    }
}

