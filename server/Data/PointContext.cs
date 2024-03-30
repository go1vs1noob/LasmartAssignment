using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class PointContext : DbContext
{
    public PointContext(DbContextOptions<PointContext> options) : base(options)
    {
        
    }

    public DbSet<Point> Points { get; set; }
    public DbSet<Comment> Comments { get; set; }
}