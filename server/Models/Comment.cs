using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;

namespace server.Models;

public class Comment
{
    public int Id { get; set; }
    [Required]
    public string Text { get; set; }

    public string ColorHex { get; set; }

    public int PointId { get; set; }
    [ForeignKey("PointId")] 
    public Point Point { get; set; }
}