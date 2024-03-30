using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.DTOs;

namespace server.Controllers;
[ApiController]
[Route("api/[controller]")]
public class PointsController: ControllerBase
{
    private readonly PointContext _pointContext;
    public PointsController(PointContext pointContext)
    {
        _pointContext = pointContext;
    }
    [HttpGet]
    public async Task<ActionResult<List<Point>>> GetAllPoints()
    {
        return await _pointContext
            .Points
            .Include(p => p.Comments)
            .ToListAsync();
    } 
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Point>> GetPoint(int id)
    {
        Point? point = await _pointContext
                            .Points
                            .Include(p => p.Comments)
                            .FirstOrDefaultAsync(p => p.Id == id);
        if (point == null)
        {
            return NotFound();
        }
        return Ok(point);
    }

    [HttpPost]
    public async Task<ActionResult<Point>> AddPoint([FromBody] AddPointDTO pointDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }
        
        Point point = new Point()
        {
            X = pointDto.X,
            Y = pointDto.Y,
            Radius = pointDto.Radius,
            ColorHex = pointDto.ColorHex,
        };
        
        await _pointContext.AddAsync(point);
        await _pointContext.SaveChangesAsync();

        return Ok(point);
    }
    [HttpPatch]
    public async Task<ActionResult<Point>> PatchPoint([FromBody] PatchPointDTO pointDto)
    {
        if (!ModelState.IsValid)
        {
			return BadRequest();
		}
        Point? point = await _pointContext.Points.FirstOrDefaultAsync(p => p.Id == pointDto.Id);
        if (point == null)
        {
			return NotFound();
		}
        point.X = pointDto.X;
        point.Y = pointDto.Y;
        _pointContext.Points.Update(point);
        await _pointContext.SaveChangesAsync();
        return Ok(point);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Point>> DeletePoint(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        Point? pointToDelete = await _pointContext
                               .Points
                               .Include(p => p.Comments)
                               .FirstOrDefaultAsync(p => p.Id == id);
        if (pointToDelete == null)
        {
            return BadRequest();
        }
        
        foreach (var comment in pointToDelete.Comments)
        {
            _pointContext.Comments.Remove(comment);
        }
        _pointContext.Points.Remove(pointToDelete);
        await _pointContext.SaveChangesAsync();
        return Ok(pointToDelete.Id);
    }
}

